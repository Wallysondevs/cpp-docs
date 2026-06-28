# std::array&lt;T,N&gt;::at

```cpp
reference at( size_type pos );  // (1) (desde C++11)
(constexpr desde C++17)
const_reference at( size_type pos ) const;  // (2) (desde C++11)
(constexpr desde C++14)
```

Retorna uma referência para o elemento na posição especificada pos, com verificação de limites.

Se pos não estiver dentro do range do container, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) é lançada.

### Parâmetros

- **pos** — posição do elemento a ser retornado

### Valor de retorno

Referência para o elemento solicitado

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se pos >= size().

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <cstddef>
    #include <iostream>
    #include <array>
    #include <stdexcept>
    
    int main()
    {
        std::array<int, 6> data{1, 2, 4, 5, 5, 6};
    
        // Set element 1
        data.at(1) = 88;
    
        // Read element 2
        std::cout << "Element at index 2 has value " << data.at(2) << '\n';
    
        std::cout << "data size = " << data.size() << '\n';
    
        try
        {
            // Try to set an element at random position >= size()
            auto moon_phase = []
            {
                return std::chrono::system_clock::now().time_since_epoch().count() % 8;
            };
            data.at(data.size() + moon_phase()) = 13;
        }
        catch(const std::out_of_range& ex)
        {
            std::cout << ex.what() << '\n';
        }
    
        // Print final values
        std::cout << "data:";
        for (int elem : data)
            std::cout << ' ' << elem;
        std::cout << '\n';
    }
```

Saída possível:
```
    Element at index 2 has value 4
    data size = 6
    array::at: __n (which is 8) >= _Nm (which is 6)
    data: 1 88 4 5 5 6
```

### Veja também

[ operator[]](<#/doc/container/array/operator_at>) | acessa o elemento especificado
(função membro pública)