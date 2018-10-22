$(function() {

    // Input and output textareas selection with jQuery
    var $input = $("#input"),
        $output = $("#output");

    /* Input parsing, from string (tab separated values) to an array of arrays
     * Function parameters:
     * - text to be parsed (as a string)
     * - field separator (ie. TAB for tab separated values)
     * - line separator (ie. new line char)
     * Returns an array of arrays
    */
    function parse(text,field_separator,line_separator) {

        // Parameters normalization and default values
        var text = text || "",
            field_separator = field_separator || "\t",
            line_separator = line_separator || "\n";

        // Computes and returns an array of arrays using underscore library
        return _.map(text.split(line_separator), function(line) {
            return line.split(field_separator);
        });

    }

    /* Input pivoting function, from an arrays of arrays to an object of objects of arrays
     * Function parameters:
     * - an array of arrays
     * Returns an object of objects of arrays
    */
    function pivot(input) {

        // Parameters normalization and default values
        var input = input || [],
            output = {}; // An object with row ids as keys

        // Output computation using underscore library
        _.each( // For each line
            input,
            /* Parameters:
             * - line: an array of fields (a line in the original text input)
             * - ln: line number
            */
            function(line,ln) {
                // In position 0 there are row ids
                // In position 1 there are col ids
                // In position 2 there are values to concatenate
                output[line[0]] = output[line[0]] || {};
                output[line[0]][line[1]] = output[line[0]][line[1]] || [];
                output[line[0]][line[1]].push(line[2]);
            }
        );

        // Returns an object of objects of arrays
        return output;

    }

    /* Output formatting, from an array of arrays to a string (tab separated values)
     * Function parameters:
     * - data to be formatted (an object of objects of arrays)
     * - field separator (ie. TAB for tab separated values)
     * - line separator (ie. new line char)
     * Returns a string
    */
   function format(data,field_separator,line_separator) {
        
        // Parameters normalization and default values
        var data = data || {},
            field_separator = field_separator || "\t",
            line_separator = line_separator || "\n";

        var rows = _.sortBy(_.keys(data)),
            cols = _.sortBy(_.uniq(_.flatten(_.map(_.values(data), function(v) { return _.keys(v)}))));

        // Computes a string using underscore library
        return _.flatten([
            _.flatten(["",cols]).join(field_separator),
            _.map(rows, function(row) {
                return _.flatten([
                    row,
                    _.map(cols, function(col) { return (data[row][col] || [""]).join(','); })
                ]).join(field_separator);
            })
        ]).join(line_separator);

    }

    // Trigger transformation pipeline on input textarea change
    $input.change(function() {
        $output.val(
            format(
                pivot(
                    parse($(this).val())
                )
            )
        );
    });

});
