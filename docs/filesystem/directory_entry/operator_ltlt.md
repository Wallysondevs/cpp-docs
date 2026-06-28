# operator&lt;&lt;(std::filesystem::directory_entry)

```cpp
template< class CharT, class Traits >
friend std::basic_ostream<CharT,Traits>&
operator<<( std::basic_ostream<CharT,Traits>& os, const directory_entry& d );  // (desde C++17)
```

  
Realiza a saída de stream na entrada de diretório d. Equivalente a `return os << d.path();`.

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando `std::filesystem::directory_entry` é uma classe associada dos argumentos. Isso previne conversões indesejáveis na presença de uma [diretiva using](<#/doc/language/namespace>) `using namespace std::filesystem;`.

### Parâmetros

os  |  \-  |  stream para realizar a saída   
---|---|---
d  |  \-  |  `directory_entry` a ser inserida   
  
### Valor de retorno

os

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
     
    int main()
    {
        const auto entries = {fs::directory_entry{fs::current_path()},
                              fs::directory_entry{fs::temp_directory_path()}};
     
        for (const fs::directory_entry& de : entries)
            std::cout << de << '\n';
    }
```

Saída possível: 
```
    "/home/猫"
    "/tmp"
```

### Ver também

[ operator<&lt;operator&gt;>](<#/doc/filesystem/path/operator_ltltgtgt>)(C++17) |  realiza entrada e saída de stream em um path entre aspas   
(função)  