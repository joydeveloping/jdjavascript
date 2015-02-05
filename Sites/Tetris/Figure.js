// Figure.js - fugure.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------
// Create.
//--------------------------------------------------------------------------------------------------

// Constructor.
//
// Arguments:
//   type - type of figure,
//   orient - orientation (0 - right, 1 - up, 2 - left, 3 - down),
//   row - base cell row,
//   col - base cell column,
//   drawer - drawer.
function Figure(type, orient, row, col, color, drawer)
{
    this.Type = type;
    this.Orient = orient;
    this.Row = row;
    this.Col = col;
    this.Color = color;
    this.Drawer = drawer;
}

//--------------------------------------------------------------------------------------------------

// Get random figure.
//
// Arguments:
//   row - base cell row,
//   col - base cell column,
//   drawer - drawer.
Figure.RandomFigure = function(row, col, drawer)
{
    var names = ["r", "rr", "rrr", "rru", "rrrr", "rrul", "rrru",
                 "rrrd", "rrur", "rrdr", "rr(r,u)", "star5"];

    return new Figure(JD.Utils.RandomArrayElement(names),
                      JD.Utils.RandomN(0, 3),
                      row, col, "indianred", drawer);
}

//--------------------------------------------------------------------------------------------------

// Get clone.
//
// Result:
//   Clone of figure.
Figure.prototype.Clone = function()
{
    return new Figure(this.Type, this.Orient, this.Row, this.Col, this.Color, this.Drawer);
}

//--------------------------------------------------------------------------------------------------
// Drawing.
//--------------------------------------------------------------------------------------------------

// Draw cell.
//
// Arguments:
//   row - row number,
//   col - column number.
Figure.prototype.DrawCell = function(row, col, color)
{
    // Margin.
    var d = 0.02;

    this.Drawer.SetFillColor(color);
    this.Drawer.FillRect(col + d, row + d, col + 1 - d, row + 1 - d);
}

//--------------------------------------------------------------------------------------------------

// Drawing.
Figure.prototype.Draw = function()
{
    var cells = this.Cells();

    for (var i = 0; i < cells.length; i++)
    {
        this.DrawCell(cells[i].R, cells[i].C, this.Color);
    }
}

//--------------------------------------------------------------------------------------------------
// Geometry.
//--------------------------------------------------------------------------------------------------

// Take array of 1 cell.
//
// Agruments:
//   r1 - row of the first cell,
//   c1 - column of the first cell.
//
// Result:
//   Array of cell.
Figure.prototype.Cells1 = function(r1, c1)
{
    return [ {R : r1, C : c1} ];
}

//--------------------------------------------------------------------------------------------------

// Take array of 2 cells.
//
// Agruments:
//   r1 - row of the first cell,
//   c1 - column of the first cell,
//   r2 - row of the second cell,
//   c2 - column of the second cell.
//
// Result:
//   Array of 2 cells.
Figure.prototype.Cells2 = function(r1, c1, r2, c2)
{
    return [ {R : r1, C : c1}, {R : r2, C : c2} ];
}

//--------------------------------------------------------------------------------------------------

// Take array of 3 cells.
//
// Agruments:
//   r1 - row of the first cell,
//   c1 - column of the first cell,
//   r2 - row of the second cell,
//   c2 - column of the second cell,
//   r3 - row of the third cell,
//   c3 - column of the third cell.
//
// Result:
//   Array of 3 cells.
Figure.prototype.Cells3 = function(r1, c1, r2, c2, r3, c3)
{
    return [ {R : r1, C : c1}, {R : r2, C : c2}, {R : r3, C : c3} ];
}

//--------------------------------------------------------------------------------------------------

// Take array of 4 cells.
//
// Agruments:
//   r1 - row of the first cell,
//   c1 - column of the first cell,
//   r2 - row of the second cell,
//   c2 - column of the second cell,
//   r3 - row of the third cell,
//   c3 - column of the third cell,
//   r4 - row of the 4-th cell,
//   c4 - column of the 4-th cell.
//
// Result:
//   Array of 4 cells.
Figure.prototype.Cells4 = function(r1, c1, r2, c2, r3, c3, r4, c4)
{
    return [ {R : r1, C : c1}, {R : r2, C : c2}, {R : r3, C : c3}, {R : r4, C : c4} ];
}

//--------------------------------------------------------------------------------------------------

// Take array of 5 cells.
//
// Agruments:
//   r1 - row of the first cell,
//   c1 - column of the first cell,
//   r2 - row of the second cell,
//   c2 - column of the second cell,
//   r3 - row of the third cell,
//   c3 - column of the third cell,
//   r4 - row of the 4-th cell,
//   c4 - column of the 4-th cell,
//   r5 - row of the 5-th cell,
//   c5 - column of the 5-th cell.
//
// Result:
//   Array of 5 cells.
Figure.prototype.Cells5 = function(r1, c1, r2, c2, r3, c3, r4, c4, r5, c5)
{
    return [ {R : r1, C : c1}, {R : r2, C : c2}, {R : r3, C : c3},
             {R : r4, C : c4}, {R : r5, C : c5} ];
}

//--------------------------------------------------------------------------------------------------

// Take array of cells.
//
// Result:
//   Array of cells.
Figure.prototype.Cells = function()
{
    var r = this.Row;
    var c = this.Col;
    var or = this.Orient;

    switch (this.Type)
    {
        // r - 1 cell.
        //
        // Orientation:
        //   0      1      2      3
        //
        //   @  ->  @  ->  @  ->  @
        case "r":
            return this.Cells1(r, c);

        // rr - 2 cells line.
        //
        // Orientation:
        //   0       1       2      3
        //
        //           #
        //   @#  ->  @  ->  #@  ->  @
        //                          #
        case "rr":
            switch (or)
            {
                case 0:
                    return this.Cells2(r, c, r, c + 1);
                case 1:
                    return this.Cells2(r, c, r + 1, c);
                case 2:
                    return this.Cells2(r, c - 1, r, c);
                case 3:
                    return this.Cells2(r - 1, c, r, c);
            }

        // rrr - 3 cells line.
        //
        // Orientation:
        //    0       1       2       3
        //
        //            #               #
        //   #@#  ->  @  ->  #@#  ->  @
        //            #               #
        case "rrr":
            switch (or)
            {
                case 0:
                case 2:
                    return this.Cells3(r, c - 1, r, c, r, c + 1);
                case 1:
                case 3:
                    return this.Cells3(r - 1, c, r, c, r + 1, c);
            }

        // rru - 3 cells angle.
        //
        // Orientation:
        //    0       1      2       3
        //
        //    #                      #
        //   #@  ->  #@  ->  @#  ->  @#
        //            #      #
        case "rru":
            switch (or)
            {
                case 0:
                    return this.Cells3(r, c, r, c - 1, r + 1, c);
                case 1:
                    return this.Cells3(r, c, r, c - 1, r - 1, c);
                case 2:
                    return this.Cells3(r, c, r, c + 1, r - 1, c);
                case 3:
                    return this.Cells3(r, c, r, c + 1, r + 1, c);
            }

        // rrrr - 4 cells line.
        //
        // Orientation:
        //    0        1        2       3
        //
        //             #
        //             #                #
        //   #@##  ->  @  ->  ##@#  ->  @
        //             #                #
        //                              #
        case "rrrr":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c - 1, r, c, r, c + 1, r, c + 2);
                case 1:
                    return this.Cells4(r - 1, c, r, c, r + 1, c, r + 2, c);
                case 2:
                    return this.Cells4(r, c - 2, r, c - 1, r, c, r, c + 1);
                case 3:
                    return this.Cells4(r - 2, c, r - 1, c, r, c, r + 1, c);
            }

        // rrul - square.
        //
        // Orientation:
        //   0        1       2      3
        //
        //   ##      ##
        //   @#  ->  #@  ->  #@  ->  @#
        //                   ##      ##
        case "rrul":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c, r, c + 1, r + 1, c, r + 1, c + 1);
                case 1:
                    return this.Cells4(r, c, r, c - 1, r + 1, c, r + 1, c - 1);
                case 2:
                    return this.Cells4(r, c, r, c - 1, r - 1, c, r - 1, c - 1);
                case 3:
                    return this.Cells4(r, c, r, c + 1, r - 1, c, r - 1, c + 1);
            }

        // rrru - 4 cells angle.
        //
        // Orientation:
        //     0       1      2        3
        //
        //                             #
        //     #                       #
        //   ##@  ->  #@  ->  @##  ->  @#
        //             #      #
        //             #
        case "rrru":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c, r + 1, c, r, c - 1, r, c - 2);
                case 1:
                    return this.Cells4(r, c, r, c - 1, r - 1, c, r - 2, c);
                case 2:
                    return this.Cells4(r, c, r, c + 1, r, c + 2, r - 1, c);
                case 3:
                    return this.Cells4(r, c, r, c + 1, r + 1, c, r + 2, c);
            }


        // rrrd - 4 cells angle.
        //
        // Orientation:
        //     0      1       2         3
        //
        //                              #
        //                    #         #
        //   ##@  ->  @#  ->  @##  ->  #@
        //     #      #
        //            #
        case "rrrd":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c, r, c - 1, r, c - 2, r - 1, c);
                case 1:
                    return this.Cells4(r, c, r, c + 1, r - 1, c, r - 2, c);
                case 2:
                    return this.Cells4(r, c, r, c + 1, r, c + 2, r + 1, c);
                case 3:
                    return this.Cells4(r, c, r, c - 1, r + 1, c, r + 2, c);
            }

        // rrur - 4 cells snake.
        //
        // Orientation:
        //    0        1       2       3
        //
        //    ##      #                #
        //   #@   ->  #@  ->   @#  ->  @#
        //             #      ##        #
        case "rrur":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c, r, c - 1, r + 1, c, r + 1, c + 1);
                case 1:
                    return this.Cells4(r, c, r - 1, c, r, c - 1, r + 1, c - 1);
                case 2:
                    return this.Cells4(r, c, r, c + 1, r - 1, c, r - 1, c - 1);
                case 3:
                    return this.Cells4(r, c, r + 1, c, r, c + 1, r - 1, c + 1);
            }

        // rrdr - 4 cells snake.
        //
        // Orientation:
        //    0       1        2        3
        //
        //             #      ##        #
        //   #@   ->  @#  ->   @#  ->  #@
        //    ##      #                #
        case "rrdr":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c, r, c - 1, r - 1, c, r - 1, c + 1);
                case 1:
                    return this.Cells4(r, c, r - 1, c, r, c + 1, r + 1, c + 1);
                case 2:
                    return this.Cells4(r, c, r, c + 1, r + 1, c, r + 1, c - 1);
                case 3:
                    return this.Cells4(r, c, r + 1, c, r, c - 1, r - 1, c - 1);
            }

        // rr(r,u) - crown.
        //
        // Orientation:
        //    0        1       2       3
        //
        //    #        #               #
        //   #@#  ->  #@  ->  #@#  ->  @#
        //             #       #       #
        case "rr(r,u)":
            switch (or)
            {
                case 0:
                    return this.Cells4(r, c, r, c - 1, r, c + 1, r + 1, c);
                case 1:
                    return this.Cells4(r, c, r - 1, c, r + 1, c, r, c - 1);
                case 2:
                    return this.Cells4(r, c, r, c - 1, r, c + 1, r - 1, c);
                case 3:
                    return this.Cells4(r, c, r - 1, c, r + 1, c, r, c + 1);
            }

        // star5 - star of 5 cells.
        //
        // Orientation:
        //    0        1        2        3
        //
        //    #        #        #        #
        //   #@#  ->  #@#  ->  #@#  ->  #@#
        //    #        #        #        #
        case "star5":
            return this.Cells5(r, c, r - 1, c, r + 1, c, r, c - 1, r, c + 1);

        default:
            return undefined;
    }
}

//--------------------------------------------------------------------------------------------------

// Rotate right.
Figure.prototype.RotR = function()
{
    this.Orient = (this.Orient + 1) % 4;
}

//--------------------------------------------------------------------------------------------------

// Rotate left.
Figure.prototype.RotL = function()
{
    this.Orient = (this.Orient + 3) % 4;
}

//--------------------------------------------------------------------------------------------------

// Move right.
Figure.prototype.Right = function()
{
    this.Col++;
}

//--------------------------------------------------------------------------------------------------

// Move left.
Figure.prototype.Left = function()
{
    this.Col--;
}

//--------------------------------------------------------------------------------------------------

// Move up.
Figure.prototype.Up = function()
{
    this.Row++;
}

//--------------------------------------------------------------------------------------------------

// Move down.
Figure.prototype.Down = function()
{
    this.Row--;
}

//--------------------------------------------------------------------------------------------------

// Autoposition.
// Move upper figure cell to given row.
//
// Arguments:
//   row - upper row of figure,
//   left - left column,
//   right - right column of align.
Figure.prototype.Autoposition = function(row, left, right)
{
    var cells = this.Cells();
    var max_row = -1;
    var min_col = -1;
    var max_col = -1;

    for (var i in cells)
    {
        if (cells[i].R > max_row)
        {
            max_row = cells[i].R;
        }

        if ((min_col == -1) || (cells[i].C < min_col))
        {
            min_col = cells[i].C;
        }

        if (cells[i].C > max_col)
        {
            max_col = cells[i].C;
        }
    }

    // Upper position.
    this.Row += (row - max_row);

    // Center.
    var dl = min_col - left;
    var dr = right - max_col;

    if (dl > dr + 1)
    {
        this.Col -= Math.floor((dl - dr) / 2);
    }
    else if (dr > dl + 1)
    {
        this.Col += Math,floor((dr - dl) / 2);
    }
}

//--------------------------------------------------------------------------------------------------

