# std::experimental::filesystem::operator/(std::experimental::filesystem::path)

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
path operator/( const path& lhs, const path& rhs );
```

  
Concatena dois caminhos. Efetivamente retorna path(lhs) /= rhs. 

### Parâmetros

lhs, rhs  |  \-  |  caminhos a serem concatenados   
  
### Valor de retorno

O resultado da concatenação de caminhos. 

### Exceções

[`noexcept`](<#/doc/language/noexcept_spec>) especificação: 

noexcept

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
     
    int main()
    {
        fs::path p1 = "C:Users";
        std::cout << "\"C:\" / \"Users\" == " << p1 << '\n';
        fs::path p2 = "batman";
        fs::path p3 = p1 / p2; // inserts fs::path::preferred_separator, '\' on Windows
        std::cout << "\"C:\" / \"Users\" / \"batman\" == " << p3 << '\n';
    }
```

Saída: 
```
    "C:" / "Users" == "C:Users"
    "C:" / "Users" / "batman" == "C:Users\batman"
```

### Veja também

[ appendoperator/=](<#/doc/experimental/fs/path/append>) |  anexa elementos ao caminho   
(função membro pública)  