# std::chrono::operator&lt;&lt; (std::chrono::duration)

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
template<
class CharT,
class Traits,
class Rep,
class Period
> std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::chrono::duration<Rep, Period>& d );  // (desde C++20)
```

Insere uma representação textual de d em os.

Comporta-se como se fosse implementado como
```
    std::basic_ostringstream<CharT, Traits> s;
    s.flags(os.flags());
    s.imbue(os.getloc());
    s.precision(os.precision());
    s << d.count() << units_suffix; // veja abaixo
    return os << s.str();
```

Em outras palavras, os flags do stream, locale e precisão são determinados pelo stream, mas qualquer preenchimento é determinado usando a string de saída completa.

O `units_suffix` é determinado com base em `Period::type` de acordo com a seguinte tabela.

`Period::type` | Suffix
---|---
std::atto | `as`
[std::femto](<#/doc/numeric/ratio/ratio>) | `fs`
[std::pico](<#/doc/numeric/ratio/ratio>) | `ps`
[std::nano](<#/doc/numeric/ratio/ratio>) | `ns`
[std::micro](<#/doc/numeric/ratio/ratio>) | `µs` (U+00B5) ou `us`, é definido pela implementação qual é usado
[std::milli](<#/doc/numeric/ratio/ratio>) | `ms`
[std::centi](<#/doc/numeric/ratio/ratio>) | `cs`
[std::deci](<#/doc/numeric/ratio/ratio>) | `ds`
[`std::ratio<1>`](<#/doc/numeric/ratio/ratio>) | `s`
[std::deca](<#/doc/numeric/ratio/ratio>) | `das`
[std::hecto](<#/doc/numeric/ratio/ratio>) | `hs`
[std::kilo](<#/doc/numeric/ratio/ratio>) | `ks`
[std::mega](<#/doc/numeric/ratio/ratio>) | `Ms`
[std::giga](<#/doc/numeric/ratio/ratio>) | `Gs`
[std::tera](<#/doc/numeric/ratio/ratio>) | `Ts`
[std::peta](<#/doc/numeric/ratio/ratio>) | `Ps`
[std::exa](<#/doc/numeric/ratio/ratio>) | `Es`
[`std::ratio<60>`](<#/doc/numeric/ratio/ratio>) | `min`
[`std::ratio<3600>`](<#/doc/numeric/ratio/ratio>) | `h`
[`std::ratio<86400>`](<#/doc/numeric/ratio/ratio>) | `d`
Nenhum dos anteriores, e Period::type::den == 1 | `[_num_]s`
Nenhum dos anteriores | `[_num_ /_den_]s`

Para as duas últimas linhas da tabela, `_num_` e `_den_` no sufixo são `Period::type::num` e `Period::type::den` formatados como um número decimal sem zeros à esquerda, respectivamente.

### Valor de retorno

Uma referência para o stream, ou seja, os.

### Exemplo

Este exemplo mostra a saída de `std::chrono::operator<<` quando fornecida uma duration:

Execute este código
```
    #include <chrono>
    #include <iostream>
    using namespace std::chrono_literals;
    
    int main()
    {
        constexpr auto duration = 123ms;
        std::cout << duration << '\n';
    }
```

Saída:
```
    123ms
```

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(function template)
[ std::formatter<std::chrono::duration>](<#/doc/chrono/duration/formatter>)(C++20) | suporte de formatação para `duration`
(class template specialization)
[ operator<&lt;operator&gt;>](<#/doc/string/basic_string/operator_ltltgtgt>) | realiza entrada e saída de stream em strings
(function template)
[ to_string](<#/doc/string/basic_string/to_string>)(C++11) | converte um valor integral ou de ponto flutuante para `string`
(function)
[ to_wstring](<#/doc/string/basic_string/to_wstring>)(C++11) | converte um valor integral ou de ponto flutuante para `wstring`
(function)