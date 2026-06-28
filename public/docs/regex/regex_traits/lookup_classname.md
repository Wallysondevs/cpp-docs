# std::regex_traits&lt;CharT&gt;::lookup_classname

template< class ForwardIt >  
char_class_type lookup_classname( ForwardIt first,  
ForwardIt last,  
bool icase = false ) const;

  
Se a sequência de caracteres `[`first`, `last`)` representa o nome de uma classe de caracteres válida na locale atualmente imbuída (ou seja, a string entre `[:` e `:]` em expressões regulares), retorna o valor definido pela implementação que representa esta classe de caracteres. Caso contrário, retorna zero. 

Se o parâmetro `icase` for `true`, a classe de caracteres ignora a distinção entre maiúsculas e minúsculas, por exemplo, a regex `[:lower:]` com [std::regex_constants::icase](<#/doc/regex/syntax_option_type>) gera uma chamada para [std::regex_traits](<#/doc/regex/regex_traits>)<>::lookup_classname() com `[`first`, `last`)` indicando a string "lower" e `icase == true`. Esta chamada retorna a mesma máscara de bits que a chamada gerada pela regex `[:alpha:]` com `icase == false`. 

Os seguintes nomes de classes de caracteres estreitos e largos são sempre reconhecidos por [std::regex_traits](<#/doc/regex/regex_traits>)&lt;char&gt; e [std::regex_traits](<#/doc/regex/regex_traits>)<wchar_t> respectivamente, e as classificações retornadas (com `icase == false`) correspondem às classificações correspondentes obtidas pela facet [std::ctype](<#/doc/locale/ctype>) da locale imbuída, como segue: 

Nome da classe de caracteres  |  Classificação [std::ctype](<#/doc/locale/ctype>)   
---|---|---
Estreito  | Largo   
"alnum" | L"alnum" | [std::ctype_base::alnum](<#/doc/locale/ctype_base>)  
"alpha" | L"alpha" | [std::ctype_base::alpha](<#/doc/locale/ctype_base>)  
"blank" | L"blank" | [std::ctype_base::blank](<#/doc/locale/ctype_base>)  
"cntrl" | L"cntrl" | [std::ctype_base::cntrl](<#/doc/locale/ctype_base>)  
"digit" | L"digit" | [std::ctype_base::digit](<#/doc/locale/ctype_base>)  
"graph" | L"graph" | [std::ctype_base::graph](<#/doc/locale/ctype_base>)  
"lower" | L"lower" | [std::ctype_base::lower](<#/doc/locale/ctype_base>)  
"print" | L"print" | [std::ctype_base::print](<#/doc/locale/ctype_base>)  
"punct" | L"punct" | [std::ctype_base::punct](<#/doc/locale/ctype_base>)  
"space" | L"space" | [std::ctype_base::space](<#/doc/locale/ctype_base>)  
"upper" | L"upper" | [std::ctype_base::upper](<#/doc/locale/ctype_base>)  
"xdigit" | L"xdigit" | [std::ctype_base::xdigit](<#/doc/locale/ctype_base>)  
"d" | L"d" | [std::ctype_base::digit](<#/doc/locale/ctype_base>)  
"s" | L"s" | [std::ctype_base::space](<#/doc/locale/ctype_base>)  
"w" | L"w" | [std::ctype_base::alnum](<#/doc/locale/ctype_base>)  
com '_' opcionalmente adicionado   
  
A classificação retornada para a string "w" pode ser exatamente a mesma que "alnum", caso em que [isctype()](<#/doc/regex/regex_traits/isctype>) adiciona '_' explicitamente. 

Classificações adicionais como "jdigit" ou "jkanji" podem ser fornecidas por locales do sistema (caso em que também são acessíveis através de [std::wctype](<#/doc/string/wide/wctype>)). 

### Parâmetros

first, last  |  \-  |  um par de iteradores que determina a sequência de caracteres que representa um nome de uma classe de caracteres   
---|---|---
icase  |  \-  |  se `true`, ignora a distinção entre maiúsculas/minúsculas na classificação de caracteres   
Requisitos de tipo   
-`ForwardIt` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).   
  
### Valor de retorno

A máscara de bits que representa a classificação de caracteres determinada pela classe de caracteres fornecida, ou `char_class_type()` se a classe for desconhecida. 

### Exemplo

Demonstra uma implementação customizada de `regex traits` para `lookup_classname()` / [`isctype()`](<#/doc/regex/regex_traits/isctype>):

Run this code
```cpp
    #include <cwctype>
    #include <iostream>
    #include <locale>
    #include <regex>
    
    // This custom regex traits uses wctype/iswctype to implement lookup_classname/isctype.
    struct wctype_traits : std::regex_traits<wchar_t>
    {
        using char_class_type = std::wctype_t;
    
        template<class It>
        char_class_type lookup_classname(It first, It last, bool = false) const
        {
            return std::wctype(std::string(first, last).c_str());
        }
    
        bool isctype(wchar_t c, char_class_type f) const
        {
            return std::iswctype(c, f);
        }
    };
    
    int main()
    {
        std::locale::global(std::locale("ja_JP.utf8"));
        std::wcout.sync_with_stdio(false);
        std::wcout.imbue(std::locale());
    
        std::wsmatch m;
        std::wstring in = L"風の谷のナウシカ";
        // matches all characters (they are classified as alnum)
        std::regex_search(in, m, std::wregex(L"([[:alnum:]]+)"));
        std::wcout << "alnums: " << m[1] << '\n'; // prints "風の谷のナウシカ"
        // matches only the katakana
        std::regex_search(in, m,
                          std::basic_regex<wchar_t, wctype_traits>(L"([[:jkata:]]+)"));
        std::wcout << "katakana: " << m[1] << '\n'; // prints "ナウシカ"
    }
```

Output: 
```
    alnums: 風の谷のナウシカ
    katakana: ナウシカ
```

### Veja também

[ isctype](<#/doc/regex/regex_traits/isctype>) |  indica a pertinência a uma classe de caracteres   
(função membro pública)  
[ wctype](<#/doc/string/wide/wctype>) |  procura uma categoria de classificação de caracteres na locale C atual   
(função)