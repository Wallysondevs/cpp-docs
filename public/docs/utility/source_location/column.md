# std::source_location::column

```cpp
constexpr std::uint_least32_t column() const noexcept;  // (desde C++20)
```

  
Retorna um valor definido pela implementação representando algum deslocamento do início da linha representada por este objeto (ou seja, o número da coluna). Os números de coluna são presumidos como sendo baseados em 1. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um valor definido pela implementação representando algum deslocamento do início da linha representada por este objeto (ou seja, o número da coluna). 

Uma implementação é encorajada a usar `0` quando o número da coluna é desconhecido. 

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <source_location>
     
    template<typename T = std::source_location>
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
    //      ↓: column #9
        pos(); std::cout << "Proxima\n";    // row #18
          pos(); std::cout << "Centauri\n"; // row #19
    //        ↑: column #11
    }
```

Saída possível: 
```
    (18:9) Proxima
    (19:11) Centauri
```

### Veja também

[ line](<#/doc/utility/source_location/line>) | retorna o número da linha representado por este objeto   
(função membro pública)  
[ file_name](<#/doc/utility/source_location/file_name>) | retorna o nome do arquivo representado por este objeto   
(função membro pública)  
[ function_name](<#/doc/utility/source_location/function_name>) | retorna o nome da função representada por este objeto, se houver   
(função membro pública)  
[ Informações de nome de arquivo e linha](<#/doc/preprocessor/line>)