# std::char_traits

Definido no header `[<string>](<#/doc/header/string>)`

```cpp
template<
class CharT
> class char_traits;
```

A classe `char_traits` é um template de classe de traits que abstrai operações básicas de caracteres e strings para um dado tipo de caractere. O conjunto de operações definido é tal que algoritmos genéricos quase sempre podem ser implementados em termos dele. É, portanto, possível usar tais algoritmos com quase qualquer tipo de caractere ou string possível, apenas fornecendo uma classe `char_traits` customizada.

O template de classe `char_traits` serve como base para instanciações explícitas. O usuário pode [fornecer uma especialização](<#/doc/language/extending_std>) para quaisquer tipos de caracteres customizados. Várias especializações explícitas são fornecidas para os tipos de caracteres padrão (veja abaixo), outras especializações não são obrigadas a satisfazer os requisitos de [CharTraits](<#/doc/named_req/CharTraits>).

### Especializações

A standard library fornece as seguintes especializações padrão:

Definido no header `[<string>](<#/doc/header/string>)`
---
std::char_traits&lt;char&gt; | os traits de caractere padrão de char
---|---
std::char_traits<wchar_t> | os traits de caractere padrão de wchar_t
std::char_traits<char8_t> (C++20) | os traits de caractere padrão de char8_t
std::char_traits<char16_t> (C++11) | os traits de caractere padrão de char16_t
std::char_traits<char32_t> (C++11) | os traits de caractere padrão de char32_t

Todas essas especializações satisfazem os requisitos de [CharTraits](<#/doc/named_req/CharTraits>).

#### Tipos Membro

As especializações padrão definem os seguintes tipos membro exigidos por [CharTraits](<#/doc/named_req/CharTraits>):

`CharT` | Tipo Membro `char_type` | `int_type` | `off_type` | `pos_type` | `state_type` char | char | int | [std::streamoff](<#/doc/io/streamoff>) | [std::streampos](<#/doc/io/fpos>) | [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) wchar_t | wchar_t | [`std::wint_t`](<#/doc/string/wide>) | [std::wstreampos](<#/doc/io/fpos>)
---|---|---|---
char8_t | char8_t | unsigned int | [std::u8streampos](<#/doc/io/fpos>)
char16_t | char16_t | [std::uint_least16_t](<#/doc/types/integer>) | [std::u16streampos](<#/doc/io/fpos>)
char32_t | char32_t | [std::uint_least32_t](<#/doc/types/integer>) | [std::u32streampos](<#/doc/io/fpos>)
Além disso, as especializações padrão também definem o tipo membro `comparison_category` como [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>). | (desde C++20)

#### Funções Membro

As especializações padrão definem as seguintes funções membro estáticas exigidas por [CharTraits](<#/doc/named_req/CharTraits>):

[ assign](<#/doc/string/char_traits/assign>)[static] | atribui um caractere
(função membro estática pública)
[ eqlt](<#/doc/string/char_traits/cmp>)[static] | compara dois caracteres
(função membro estática pública)
[ move](<#/doc/string/char_traits/move>)[static] | move uma sequência de caracteres para outra
(função membro estática pública)
[ copy](<#/doc/string/char_traits/copy>)[static] | copia uma sequência de caracteres
(função membro estática pública)
[ compare](<#/doc/string/char_traits/compare>)[static] | compara lexicograficamente duas sequências de caracteres
(função membro estática pública)
[ length](<#/doc/string/char_traits/length>)[static] | retorna o comprimento de uma sequência de caracteres
(função membro estática pública)
[ find](<#/doc/string/char_traits/find>)[static] | encontra um caractere em uma sequência de caracteres
(função membro estática pública)
[ to_char_type](<#/doc/string/char_traits/to_char_type>)[static] | converte `int_type` para o `char_type` equivalente
(função membro estática pública)
[ to_int_type](<#/doc/string/char_traits/to_int_type>)[static] | converte `char_type` para o `int_type` equivalente
(função membro estática pública)
[ eq_int_type](<#/doc/string/char_traits/eq_int_type>)[static] | compara dois valores `int_type`
(função membro estática pública)
[ eof](<#/doc/string/char_traits/eof>)[static] | retorna um valor _eof_
(função membro estática pública)
[ not_eof](<#/doc/string/char_traits/not_eof>)[static] | verifica se um caractere é um valor _eof_
(função membro estática pública)

### Notas

[CharTraits](<#/doc/named_req/CharTraits>) não exige a definição dos tipos e funções listados acima como membros diretos, ele apenas exige que tipos como `X::type` e expressões como X::func(args) sejam válidos e tenham a semântica necessária. Traits de caractere definidos pelo usuário podem ser derivados de outras classes de traits de caractere e apenas sobrescrever alguns de seus membros, veja o exemplo abaixo.

### Exemplo

Traits de caractere definidos pelo usuário podem ser usados para fornecer [comparação case-insensitive](<http://www.gotw.ca/gotw/029.htm>):

Execute este código
```cpp
    #include <cctype>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    struct ci_char_traits : public std::char_traits<char>
    {
        static char to_upper(char ch)
        {
            return std::toupper((unsigned char) ch);
        }
    
        static bool eq(char c1, char c2)
        {
            return to_upper(c1) == to_upper(c2);
        }
    
        static bool lt(char c1, char c2)
        {
             return to_upper(c1) < to_upper(c2);
        }
    
        static int compare(const char* s1, const char* s2, std::size_t n)
        {
            while (n-- != 0)
            {
                if (to_upper(*s1) < to_upper(*s2))
                    return -1;
                if (to_upper(*s1) > to_upper(*s2))
                    return 1;
                ++s1;
                ++s2;
            }
            return 0;
        }
    
        static const char* find(const char* s, std::size_t n, char a)
        {
            const auto ua{to_upper(a)};
            while (n-- != 0) 
            {
                if (to_upper(*s) == ua)
                    return s;
                s++;
            }
            return nullptr;
        }
    };
    
    template<class DstTraits, class CharT, class SrcTraits>
    constexpr std::basic_string_view<CharT, DstTraits>
        traits_cast(const std::basic_string_view<CharT, SrcTraits> src) noexcept
    {
        return {src.data(), src.size()};
    }
    
    int main()
    {
        using namespace std::literals;
    
        constexpr auto s1 = "Hello"sv;
        constexpr auto s2 = "heLLo"sv;
    
        if (traits_cast<ci_char_traits>(s1) == traits_cast<ci_char_traits>(s2))
            std::cout << s1 << " and " << s2 << " are equal\n";
    }
```

Saída:
```
    Hello and heLLo are equal
```

### Veja também

[ basic_string](<#/doc/string/basic_string>) | armazena e manipula sequências de caracteres
(template de classe)
[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) | view de string somente leitura
(template de classe)
[ basic_istream](<#/doc/io/basic_istream>) | envolve um dado dispositivo abstrato ([std::basic_streambuf](<#/doc/io/basic_streambuf>)) e fornece interface de entrada de alto nível
(template de classe)
[ basic_ostream](<#/doc/io/basic_ostream>) | envolve um dado dispositivo abstrato ([std::basic_streambuf](<#/doc/io/basic_streambuf>)) e fornece interface de saída de alto nível
(template de classe)
[ basic_streambuf](<#/doc/io/basic_streambuf>) | abstrai um dispositivo bruto
(template de classe)