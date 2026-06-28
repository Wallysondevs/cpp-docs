# std::match_results&lt;BidirIt,Alloc&gt;::format

```cpp
template< class OutputIt >
OutputIt format( OutputIt out,
const char_type* fmt_first, const char_type* fmt_last,
std::regex_constants::match_flag_type flags =
std::regex_constants::format_default ) const;  // (1) (desde C++11)
template< class OutputIt, class ST, class SA >
OutputIt format( OutputIt out,
const basic_string<char_type,ST,SA>& fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::format_default ) const;  // (2) (desde C++11)
template< class ST, class SA >
std::basic_string<char_type,ST,SA>
format( const std::basic_string<char_type,ST,SA>& fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::format_default ) const;  // (3) (desde C++11)
string_type format( const char_type* fmt_s,
std::regex_constants::match_flag_type flags =
std::regex_constants::format_default ) const;  // (4) (desde C++11)
```

  
`format` produz uma string de formato, substituindo quaisquer especificadores de formato ou sequências de escape nessa string por dados de correspondência de *this. 

1) A sequência de caracteres de formato é definida pelo range `[`fmt_first`, `fmt_last`)`. A sequência de caracteres resultante é copiada para out.

2) A sequência de caracteres de formato é definida pelos caracteres em fmt. A sequência de caracteres resultante é copiada para out.

3,4) A sequência de caracteres de formato é definida pelos caracteres em fmt e fmt_s, respectivamente. A sequência de caracteres resultante é copiada para uma [std::basic_string](<#/doc/string/basic_string>) recém-construída, que é retornada.

A bitmask flags determina quais especificadores de formato e sequências de escape são reconhecidos. 

O comportamento de `format` é indefinido se ready() != true. 

### Parâmetros

fmt_begin, fmt_end  |  \-  |  ponteiros para um range de caracteres que define a sequência de caracteres de formato   
---|---|---
fmt  |  \-  |  [std::basic_string](<#/doc/string/basic_string>) que define a sequência de caracteres de formato   
fmt_s  |  \-  |  ponteiro para uma string de caracteres terminada em nulo que define a sequência de caracteres de formato   
out  |  \-  |  iterator para o qual a sequência de caracteres resultante é copiada   
flags  |  \-  |  bitmask [std::regex_constants::match_flag_type](<#/doc/regex/match_flag_type>) que especifica quais especificadores de formato e sequências de escape são reconhecidos   
Requisitos de tipo   
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).   
  
### Valor de retorno

1,2) out

3,4) A string recém-construída contendo a sequência de caracteres resultante.

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::string s = "for a good time, call 867-5309";
        std::regex phone_regex("\\d{3}-\\d{4}");
        std::smatch phone_match;
     
        if (std::regex_search(s, phone_match, phone_regex))
        {
            std::string fmt_s = phone_match.format(
                "$`"   // $` means characters before the match
                "[$&]" // $& means the matched characters
                "$'"); // $' means characters following the match
            std::cout << fmt_s << '\n';
        }   
    }
```

Saída: 
```
    for a good time, call [867-5309]
```

### Veja também

[ regex_replace](<#/doc/regex/regex_replace>)(desde C++11) |  substitui ocorrências de uma expressão regular por texto de substituição formatado   
(modelo de função)  
[ match_flag_type](<#/doc/regex/match_flag_type>)(desde C++11) |  opções específicas para correspondência   
(typedef)