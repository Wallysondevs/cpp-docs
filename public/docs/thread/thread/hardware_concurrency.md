# std::thread::hardware_concurrency

```cpp
static unsigned int hardware_concurrency() noexcept;  // (desde C++11)
```

Retorna o número de threads concorrentes suportadas pela implementação. O valor deve ser considerado apenas uma dica.

### Parâmetros

(nenhum)

### Valor de retorno

Número de threads concorrentes suportadas. Se o valor não estiver bem definido ou não for computável, retorna ​0​.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <thread>
    
    int main()
    {
        unsigned int n = std::thread::hardware_concurrency();
        std::cout << n << " concurrent threads are supported.\n";
    }
```

Saída possível:
```
    4 concurrent threads are supported.
```

### Veja também

[ hardware_destructive_interference_sizehardware_constructive_interference_size](<#/doc/thread/hardware_destructive_interference_size>)(C++17) | deslocamento mínimo para evitar false sharing
deslocamento máximo para promover true sharing
(constante)