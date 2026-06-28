# std::experimental::source_location::column

constexpr [std::uint_least32_t](<#/doc/types/integer>) column() const noexcept; | | (library fundamentals TS v2)

Retorna um valor definido pela implementação representando algum deslocamento do início da linha representada por este objeto (isto é, o número da coluna).

### Parâmetros

(nenhum)

### Valor de retorno

Um valor definido pela implementação representando algum deslocamento do início da linha representada por este objeto (isto é, o número da coluna).

### Exemplo

Execute este código
```
    #include <experimental/source_location>
    #include <iostream>
     
    template<typename T = std::experimental::source_location>
    inline void pos(const T& location = T::current())
    {
        std::cout
            << "("
            << location.line()
            << ':'
            << location.column()
            << ") ";
    }
     
    int main()
    {
        pos(); std::cout << "Proxima\n";
        pos(); std::cout << "Centauri\n";
    }
```

Saída possível:
```
    (17:5) Proxima
    (18:5) Centauri
```

### Veja também

[ line](<#/doc/experimental/source_location/line>) | retorna o número da linha representado por este objeto
(função membro pública)
[ file_name](<#/doc/experimental/source_location/file_name>) | retorna o nome do arquivo representado por este objeto
(função membro pública)
[ function_name](<#/doc/experimental/source_location/function_name>) | retorna o nome da função representada por este objeto, se houver
(função membro pública)
[documentação C++](<#/doc/preprocessor/line>) para informações de nome de arquivo e linha