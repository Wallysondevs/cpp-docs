# std::chrono::operator&lt;&lt;(std::chrono::day)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::chrono::day& d );
```

  
Forma uma `[std::basic_string](<#/doc/string/basic_string>)<CharT> s` consistindo do valor do dia armazenado em `d` formatado como um número decimal, com um zero à esquerda se o resultado fosse, de outra forma, um único dígito decimal. Em seguida, se `!d.ok()`, anexa " is not a valid day" à string formatada. Insere essa string em `os`.

Equivalente a 

```cpp
return os << (d.ok() ?  
std::format(STATICALLY_WIDEN<CharT>("{:%d}"), d) :  
std::format(STATICALLY_WIDEN<CharT>("{:%d} is not a valid day"), d));
```

onde STATICALLY_WIDEN&lt;CharT&gt;("...") é "..." se `CharT` for `char`, e L"..." se `CharT` for `wchar_t`. 

### Valor de retorno

`os`

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::day d1{31}, d2{7}, d3{42}, d4{};
        std::cout << d1 << '\n'
                  << d2 << '\n'
                  << d3 << '\n'
                  << d4 << '\n';
    }
```

Saída possível: 
```
    31
    07
    42 is not a valid day
    00 is not a valid day
```

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) |  armazena a representação formatada dos argumentos em uma nova string   
(modelo de função)  
[ std::formatter<std::chrono::day>](<#/doc/chrono/day/formatter>)(C++20) |  suporte de formatação para `day`   
(especialização de modelo de classe)