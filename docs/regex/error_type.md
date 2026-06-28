# std::regex_constants::error_type

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
using error_type = /* implementation-defined */;
constexpr error_type error_collate = /* unspecified */;
constexpr error_type error_ctype = /* unspecified */;
constexpr error_type error_escape = /* unspecified */;
constexpr error_type error_backref = /* unspecified */;
constexpr error_type error_brack = /* unspecified */;
constexpr error_type error_paren = /* unspecified */;
constexpr error_type error_brace = /* unspecified */;
constexpr error_type error_badbrace = /* unspecified */;
constexpr error_type error_range = /* unspecified */;
constexpr error_type error_space = /* unspecified */;
constexpr error_type error_badrepeat = /* unspecified */;
constexpr error_type error_complexity = /* unspecified */;
constexpr error_type error_stack = /* unspecified */;
(inline desde C++17)
```

  
1) O `error_type` é um tipo que descreve erros que podem ocorrer durante a análise de expressões regulares.

### Constantes

Nome  |  Explicação   
---|---
`error_collate` |  a expressão contém um nome de elemento de ordenação inválido   
`error_ctype` |  a expressão contém um nome de classe de caractere inválido   
`error_escape` |  a expressão contém um caractere de escape inválido ou um escape final   
`error_backref` |  a expressão contém uma retro-referência inválida   
`error_brack` |  a expressão contém colchetes ('[' e ']') incompatíveis   
`error_paren` |  a expressão contém parênteses ('(' e ')') incompatíveis   
`error_brace` |  a expressão contém chaves ('{' e '}') incompatíveis   
`error_badbrace` |  a expressão contém um range inválido em uma expressão {}   
`error_range` |  a expressão contém um range de caracteres inválido (por exemplo, [b-a])   
`error_space` |  não havia memória suficiente para converter a expressão em uma máquina de estados finitos   
`error_badrepeat` |  '*', '?', '+' ou '{' não foi precedido por uma expressão regular válida   
`error_complexity` |  a complexidade de uma tentativa de correspondência excedeu um nível predefinido   
`error_stack` |  não havia memória suficiente para realizar uma correspondência   
  
### Exemplo

Implementa um verificador de expressões regulares:

Execute este código
```
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <regex>
    #include <sstream>
    #include <string>
     
    void regular_expression_checker(const std::string& text,
                                    const std::string& regex,
                                    const std::regex::flag_type flags)
    {
        std::cout << "Text: " << std::quoted(text) << '\n'
                  << "Regex: " << std::quoted(regex) << '\n';
     
        try
        {
            const std::regex re{regex, flags};
            const bool matched = std::regex_match(text, re);
     
            std::stringstream out;
            out << (matched ? "MATCH!\n" : "DOES NOT MATCH!\n");
     
            std::smatch m;
            if (std::regex_search(text, m, re); !m.empty())
            {
                out << "prefix = [" << m.prefix().str().data() << "]\n";
     
                for (std::size_t i{}; i != m.size(); ++i)
                    out << "  m[" << i << "] = [" << m[i].str().data() << "]\n";
     
                out << "suffix = [" << m.suffix().str().data() << "]\n";
            }
            std::cout << out.str() << '\n';
        }
        catch (std::regex_error& e)
        {
            std::cout << "Error: " << e.what() << ".\n\n";
        }
    }
     
    int main()
    {
        constexpr std::regex::flag_type your_flags
            = std::regex::flag_type{0}
        // Choose one of the supported grammars:
            | std::regex::ECMAScript
        //  | std::regex::basic
        //  | std::regex::extended
        //  | std::regex::awk
        //  | std::regex::grep
        //  | std::regex::egrep
        // Choose any of the next options:
        //  | std::regex::icase
        //  | std::regex::nosubs
        //  | std::regex::optimize
        //  | std::regex::collate
        //  | std::regex::multiline
            ;
     
        const std::string your_text = "Hello regular expressions.";
        const std::string your_regex = R"(([a-zA-Z]+) ([a-z]+) ([a-z]+)\.)";
        regular_expression_checker(your_text, your_regex, your_flags);
     
        regular_expression_checker("Invalid!", R"(((.)(.))", your_flags);
        regular_expression_checker("Invalid!", R"([.)", your_flags);
        regular_expression_checker("Invalid!", R"([.]{})", your_flags);
        regular_expression_checker("Invalid!", R"([1-0])", your_flags);
    }
```

Saída possível: 
```
    Text: "Hello regular expressions."
    Regex: "([a-zA-Z]+) ([a-z]+) ([a-z]+)\\."
    MATCH!
    prefix = []
      m[0] = [Hello regular expressions.]
      m[1] = [Hello]
      m[2] = [regular]
      m[3] = [expressions]
    suffix = []
     
    Text: "Invalid!"
    Regex: "((.)(.)"
    Error: Mismatched '(' and ')' in regular expression.
     
    Text: "Invalid!"
    Regex: "[."
    Error: Unexpected character within '[...]' in regular expression.
     
    Text: "Invalid!"
    Regex: "[.]{}"
    Error: Invalid range in '{}' in regular expression.
     
    Text: "Invalid!"
    Regex: "[1-0]"
    Error: Invalid range in bracket expression..
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2053](<https://cplusplus.github.io/LWG/issue2053>) | C++11  | as constantes foram declaradas static | removeu o especificador static   
  
### Veja também

[ regex_error](<#/doc/regex/regex_error>)(C++11) |  relata erros gerados pela biblioteca de expressões regulares   
(classe)  