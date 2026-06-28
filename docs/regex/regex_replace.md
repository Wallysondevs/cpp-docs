# std::regex_replace

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class OutputIt, class BidirIt, class Traits, class CharT,
class STraits, class SAlloc >
OutputIt regex_replace( OutputIt out, BidirIt first, BidirIt last,
const std::basic_regex<CharT, Traits>& re,
const std::basic_string<CharT, STraits, SAlloc>& fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class OutputIt, class BidirIt, class Traits, class CharT >
OutputIt regex_replace( OutputIt out, BidirIt first, BidirIt last,
const std::basic_regex<CharT, Traits>& re,
const CharT* fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class Traits, class CharT,
class STraits, class SAlloc, class FTraits, class FAlloc >
std::basic_string<CharT, STraits, SAlloc>
regex_replace( const std::basic_string<CharT, STraits, SAlloc>& str,
const std::basic_regex<CharT, Traits>& re,
const std::basic_string<CharT, FTraits, FAlloc>& fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class Traits, class CharT, class STraits, class SAlloc >
std::basic_string<CharT, STraits, SAlloc>
regex_replace( const std::basic_string<CharT, STraits, SAlloc>& str,
const std::basic_regex<CharT, Traits>& re,
const CharT* fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class Traits, class CharT, class STraits, class SAlloc >
std::basic_string<CharT>
regex_replace( const CharT* s, const std::basic_regex<CharT, Traits>& re,
const std::basic_string<CharT, STraits, SAlloc>& fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
template< class Traits, class CharT >
std::basic_string<CharT>
regex_replace( const CharT* s, const std::basic_regex<CharT, Traits>& re,
const CharT* fmt,
std::regex_constants::match_flag_type flags =
std::regex_constants::match_default );
```

`regex_replace` usa a expressão regular re para realizar substituição na sequência de caracteres alvo:

1,2) Copia caracteres no intervalo `[`first`, `last`)` para out, substituindo quaisquer sequências que correspondam a re por caracteres formatados por fmt. Equivalente a:
```cpp
    using iter_type = std::regex_iterator<BidirIt, CharT, Traits>;
    iter_type seq_begin(first, last, re, flags), seq_end;
    
    using result_type = std::match_results<BidirIt>;
    result_type m;
    
    bool need_to_copy = (flags & std::regex_constants::format_no_copy) == 0;
    bool format_all = (flags & std::regex_constants::format_first_only) != 0;
    
    for (iter_type i = seq_begin; i != seq.end(); ++i)
    {
        m = *i;
        if (need_to_copy)
            out = std::copy(m.prefix().first, m.prefix().second, out);
        if (format_all || i == seq_begin)
            out = /* replace-expr */
    }
    
    if (need_to_copy)
        out = m.ready()
                  ? std::copy(m.suffix().first, m.suffix().second, out)
                  : std::copy(first, last, out);
    
    return out;
```

1) A expressão /* replace-expr */ é m.format(out, fmt, flags).

2) A expressão /* replace-expr */ é m.format(out, fmt, fmt + [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;::length(fmt), flags).

3,4) Equivalente a `[std::basic_string](<#/doc/string/basic_string>)<CharT, STraits, SAlloc> result; regex_replace([std::back_inserter](<#/doc/iterator/back_inserter>)(result), str.begin(), str.end(), re, fmt, flags); return result;`.

5,6) Equivalente a `[std::basic_string](<#/doc/string/basic_string>)<CharT, STraits, SAlloc> result; regex_replace([std::back_inserter](<#/doc/iterator/back_inserter>)(result), s, s + [std::char_traits](<#/doc/string/char_traits>)<CharT>::length(s), re, fmt, flags); return result;`.

### Parâmetros

- **first, last** — o intervalo de caracteres alvo
- **str** — a [std::string](<#/doc/string/basic_string>) alvo
- **s** — a string estilo C terminada em nulo alvo
- **re** — a expressão regular
- **fmt** — a string de formato de substituição regex, a sintaxe exata depende do valor de flags
- **flags** — flags usadas para determinar como a correspondência será realizada
- **out** — iterator de saída para armazenar o resultado da substituição

### Valor de retorno

Conforme descrito acima.

### Exceções

Pode lançar [std::regex_error](<#/doc/regex/regex_error>) para indicar uma [condição de erro](<#/doc/regex/error_type>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #regex>
    #include <string>
    
    int main()
    {
        std::string text = "Quick brown fox";
        std::regex vowel_re("a|e|i|o|u");
    
        // write the results to an output iterator
        std::regex_replace(std::ostreambuf_iterator<char>(std::cout),
                           text.begin(), text.end(), vowel_re, "*");
    
        // construct a string holding the results
        std::cout << '\n' << std::regex_replace(text, vowel_re, "[$&]") << '\n';
    }
```

Saída:
```
    Q**ck br*wn f*x
    Q[u][i]ck br[o]wn f[o]x
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2213](<https://cplusplus.github.io/LWG/issue2213>) | C++11 | out não era atualizado pelas substituições | out é atualizado

### Veja também

[ regex_search](<#/doc/regex/regex_search>)(C++11) | tenta corresponder uma expressão regular a qualquer parte de uma sequência de caracteres
(modelo de função)
[ match_flag_type](<#/doc/regex/match_flag_type>)(C++11) | opções específicas para correspondência
(typedef)
[ replace](<#/doc/string/basic_string/replace>) | substitui uma porção especificada de uma string
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)