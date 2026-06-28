# std::regex_traits&lt;CharT&gt;::isctype

bool isctype( CharT c, char_class_type f ) const;

  
Determina se o caractere c pertence à classe de caracteres identificada por f, que, por sua vez, é um valor retornado por [lookup_classname()](<#/doc/regex/regex_traits/lookup_classname>) ou um OR bit a bit de vários desses valores.

A versão desta função fornecida nas especializações da [std::regex_traits](<#/doc/regex/regex_traits>) da standard library faz o seguinte:

1) Primeiro converte f para um valor m do tipo [std::ctype_base::mask](<#/doc/locale/ctype_base>).

Para cada categoria [std::ctype](<#/doc/locale/ctype>) listada na tabela na página [lookup_classname()](<#/doc/regex/regex_traits/lookup_classname>), se os bits em f correspondentes à categoria estiverem definidos, os bits correspondentes em m também serão definidos.

2) Em seguida, tenta classificar o caractere no locale imbuído chamando [std::use_facet](<#/doc/locale/use_facet>)<[std::ctype](<#/doc/locale/ctype>)&lt;CharT&gt;>(getloc()).is(m, c).

  * Se isso retornar true, `isctype()` também retornará true.
  * Caso contrário, se c for igual a '_', e f incluir o resultado da chamada [lookup_classname()](<#/doc/regex/regex_traits/lookup_classname>) para a classe de caracteres `[:w:]`, true é retornado, caso contrário false é retornado.

### Parâmetros

c  |  \-  |  o caractere a ser classificado   
---|---|---
f  |  \-  |  a bitmask obtida de uma ou várias chamadas para [lookup_classname()](<#/doc/regex/regex_traits/lookup_classname>)  
  
### Valor de retorno

true se c for classificado por f, false caso contrário.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::regex_traits<char> t;
        std::string str_alnum = "alnum";
        auto a = t.lookup_classname(str_alnum.begin(), str_alnum.end());
        std::string str_w = "w"; // [:w:] is [:alnum:] plus '_'
        auto w = t.lookup_classname(str_w.begin(), str_w.end());
        std::cout << std::boolalpha
                  << t.isctype('A', w) << ' ' << t.isctype('A', a) << '\n'
                  << t.isctype('_', w) << ' ' << t.isctype('_', a) << '\n'
                  << t.isctype(' ', w) << ' ' << t.isctype(' ', a) << '\n';
    }
```

Saída:
```
    true true
    true false
    false false
```

Demonstra uma implementação customizada de regex traits de [`lookup_classname()`](<#/doc/regex/regex_traits/lookup_classname>) / `isctype()`:

Execute este código
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

Saída:
```
    alnums: 風の谷のナウシカ
    katakana: ナウシカ
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2018](<https://cplusplus.github.io/LWG/issue2018>) | C++11  | o valor de m era não especificado  | corresponde ao suporte mínimo de [lookup_classname()](<#/doc/regex/regex_traits/lookup_classname>)   
  
### Ver também

[ lookup_classname](<#/doc/regex/regex_traits/lookup_classname>) | obtém uma classe de caracteres pelo nome   
(função membro pública)  
[ do_is](<#/doc/locale/ctype/is>)[virtual] | classifica um caractere ou uma sequência de caracteres   
(função membro virtual protegida de `std::ctype<CharT>`)  
[ iswctype](<#/doc/string/wide/iswctype>) | classifica um caractere largo de acordo com a categoria [`LC_CTYPE`](<#/doc/locale/LC_categories>) especificada   
(função)