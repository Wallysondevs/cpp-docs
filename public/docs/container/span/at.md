# std::span&lt;T,Extent&gt;::at

```cpp
constexpr reference at( size_type pos ) const;  // (desde C++26)
```

Retorna uma referência para o elemento na posição `pos` especificada, com verificação de limites.

Se `pos` não estiver dentro do range do span, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) é lançada.

### Parameters

- **pos** — posição do elemento a ser retornado

### Return value

Referência para o elemento solicitado

### Exceptions

[std::out_of_range](<#/doc/error/out_of_range>) se `pos >= size()`.

### Complexity

Constante.

### Notes

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_span`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | `std::span::at`

### Example

Execute este código
```
    #include <chrono>
    #include <cstddef>
    #include <iostream>
    #include <span>
    #include <stdexcept>
    
    int main()
    {
        int x[]{1, 2, 4, 5, 5, 6};
        std::span data(x);
    
        // Define o elemento 1
        data.at(1) = 88;
    
        // Lê o elemento 2
        std::cout << "Element at index 2 has value " << data.at(2) << '\n';
    
        std::cout << "data size = " << data.size() << '\n';
    
        try
        {
            // Tenta definir um elemento em uma posição aleatória >= size()
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
    
        // Imprime os valores finais
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
    std::out_of_range: pos (which is 8) >= size() (which is 6)
    data: 1 88 4 5 5 6
```

### See also

[ operator[]](<#/doc/container/span/operator_at>) | acessa o elemento especificado
(função membro pública)