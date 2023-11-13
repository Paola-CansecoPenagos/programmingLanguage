Start
  = Program

Program
  = Statement*

Statement
  = VariableDeclaration
  / IfDeclaration
  / ForDeclaration
  / FunctionDeclaration

VariableDeclaration
  = variable:Identifier _ "=" _ value:Value

IfDeclaration
  = "if" _ "(" _ condition:Expression _ ")" _ "{" _ body:Statement* _ "}"

ForDeclaration
  = "for" _ "(" _ "int" _ intVar:Identifier _ "<" _ value:NumberLiteral _ "," _ variable:Identifier _ _ inc:Increment _ ")" _ "{" _ body:Statement _ "}"

FunctionDeclaration
  = "func" _ functionName:Identifier _ "(" _ parameters:ParameterList _ ")" _ "{" _ body:Statement _ "}"

Expression
  = variable:Identifier _ operator:ComparisonOperator _ value:NumberLiteral { return { type: "if", variable, operator, value }; }

Identifier
  = _ [a-zA-Z_] [a-zA-Z0-9_]* _

Value
  = "v"
  / "f"
  / StringLiteral
  / NumberLiteral

StringLiteral
  = '"' value:([^"]*) '"' { return { type: "string", value: value.join('') }; }

NumberLiteral
  = value:[0-9]+ { return { type: "number", value: parseInt(value.join('')) }; }

_ "optional whitespace"
  = [ \t\n\r]*

ComparisonOperator
  = ">=" { return "greater_equal"; }
  / "<=" { return "less_equal"; }
  / ">" { return "greater"; }
  / "<" { return "less"; }
  / "==" { return "equal"; }

Increment
  = "++"
  / "--"

ParameterList
  = parameters:IdentifierList { return parameters; }

IdentifierList
  = first:Identifier rest:("," _ next:Identifier _ { return next; })* {
      return [first].concat(rest.map(item => item[2]));
    }