# std::experimental::source_location::line

constexpr [std::uint_least32_t](<#/doc/types/integer>) line() const noexcept; | | (library fundamentals TS v2)

Retorna o número da linha representado por este objeto.

### Parâmetros

(nenhum)

### Valor de retorno

O número da linha representado por este objeto.

### Exemplo

Execute este código
```cpp
    #include <experimental/source_location>
    #include <iostream>
    #include <string_view>
    using std::experimental::source_location;
     
    inline void cur_line(
        const std::string_view message = "",
        const source_location& location = source_location::current())
    {
        std::cout
            << location.line() // <- the call-site line #
            << ") "
            << message; 
    }
     
    int main()
    {
        cur_line("++" "\n");
        cur_line(); std::cout << "Hello," "\n";
        cur_line(); std::cout << "C++20!" "\n";
        cur_line("--" "\n");
    }
```

Saída:
```
    18) ++
    19) Hello,
    20) C++20!
    21) --
```

### Veja também

[ column](<#/doc/experimental/source_location/column>) | retorna o número da coluna representado por este objeto
(função membro pública)
[ file_name](<#/doc/experimental/source_location/file_name>) | retorna o nome do arquivo representado por este objeto
(função membro pública)
[ function_name](<#/doc/experimental/source_location/function_name>) | retorna o nome da função representado por este objeto, se houver algum
(função membro pública)
[documentação C++](<#/doc/preprocessor/line>) para informações de nome de arquivo e linha