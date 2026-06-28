# std::experimental::filesystem::space_info

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
struct space_info {
uintmax_t capacity;
uintmax_t free;
uintmax_t available;
};
```

Representa as informações do sistema de arquivos conforme determinado por [space](<#/doc/experimental/fs/space>).

Os membros têm o seguinte significado:

*   `capacity` -- tamanho total do sistema de arquivos, em bytes
*   `free` -- espaço livre no sistema de arquivos, em bytes
*   `available` -- espaço livre disponível para um processo não privilegiado (pode ser igual ou menor que `free`)

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::space_info devi = fs::space("/dev/null");
        fs::space_info tmpi = fs::space("/tmp");
    
        std::cout << "         Capacity         Free    Available\n"
                  << "/dev:   " << devi.capacity << "   "
                  << devi.free << "   " << devi.available << '\n'
                  << "/tmp: " << tmpi.capacity << ' '
                  << tmpi.free << ' '
                  << tmpi.available << '\n';
    }
```

Saída possível:
```
              Capacity         Free    Available
    /dev:   4175114240   4175110144   4175110144
    /tmp: 420651237376 411962273792 390570749952
```

### Veja também

[ space](<#/doc/experimental/fs/space>) | determina o espaço livre disponível no sistema de arquivos
(function)