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

    /* Input reversing function, from an arrays of arrays to another one
     * Function parameters:
     * - an array of arrays
     * Returns an array of arrays
    */
    function reverse(input) {

        // Parameters normalization and default values
        var input = input || [],
            output = [];

        // Output computation using underscore library
        _.each( // For each line
            input,
            /* Parameters:
             * - line: an array of fields (a line in the original text input)
             * - ln: line number
            */
            function(line,ln) {
                // Ignoring first line (ln = 0), because contains column headers
                if (ln) {
                    _.each( // For each field
                        line,
                        /* Parameters:
                        * - field: a field value
                        * - fn: field number (equal to column numbero in the original text input)
                        */
                        function(field,fn) {
                            // Ignoring first column, because contains row headers
                            if (fn) {
                                output.push([
                                    line[0], // Current row name (first element of line)
                                    input[0][fn], // Current column name
                                    field // Current field value
                                ]);
                            }
                        }
                    );
                }
            }
        );

        // Returns an array of arrays
        return output;

    }

    /* Output formatting, from an array of arrays to a string (tab separated values)
     * Function parameters:
     * - data to be formatted (an array of arrays)
     * - field separator (ie. TAB for tab separated values)
     * - line separator (ie. new line char)
     * Returns a string
    */
   function format(data,field_separator,line_separator) {
        
        // Parameters normalization and default values
        var text = text || "",
            field_separator = field_separator || "\t",
            line_separator = line_separator || "\n";

        // Computes a string using underscore library
        return _.map(data, function(line) {
            return line.join(field_separator);
        }).join(line_separator);

    }

    // Trigger transformation pipeline on input textarea change
    $input.change(function() {
        $output.val(
            format(
                reverse(
                    parse($(this).val())
                )
            )
        );
    });

});
