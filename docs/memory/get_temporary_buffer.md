# std::get_temporary_buffer

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
std::pair<T*, std::ptrdiff_t>
get_temporary_buffer( std::ptrdiff_t count );
template< class T >
std::pair<T*, std::ptrdiff_t>
get_temporary_buffer( std::ptrdiff_t count ) noexcept;
(obsoleto em C++17)
(removido em C++20)
```

Se `count` for negativo ou zero, não faz nada.

Caso contrário, solicita a alocação de armazenamento contíguo não inicializado para `count` objetos adjacentes do tipo `T`. A solicitação não é vinculativa, e a implementação pode, em vez disso, alocar o armazenamento para qualquer outro número de (incluindo zero) objetos adjacentes do tipo `T`.

É definido pela implementação se tipos com alinhamento excessivo (over-aligned) são suportados. | (desde C++11)

### Parâmetros

- **count** — o número desejado de objetos

### Valor de retorno

Um `[std::pair](<#/doc/utility/pair>)`, onde o membro `first` é um ponteiro para o início do armazenamento alocado e o membro `second` é o número de objetos que cabem no armazenamento que foi realmente alocado.

Se `count <= 0` ou o armazenamento alocado não for suficiente para armazenar um único elemento do tipo `T`, o membro `first` do resultado é um ponteiro nulo e o membro `second` é zero.

### Notas

Esta API foi originalmente projetada com a intenção de fornecer uma implementação mais eficiente do que o `operator new` de propósito geral, mas nenhuma implementação desse tipo foi criada e a API foi descontinuada e removida.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <memory>
    #include <string>
    
    int main()
    {
        const std::string s[] = {"string", "1", "test", "..."};
        const auto p = std::get_temporary_buffer<std::string>(4);
        // requires that p.first is passed to return_temporary_buffer
        // (beware of early exit points and exceptions), or better use:
        std::unique_ptr<std::string, void(*)(std::string*)> on_exit(p.first,
        * p)
        {
            std::cout << "returning temporary buffer...\n";
            std::return_temporary_buffer(p);
        });
    
        std::copy(s, s + p.second,
                  std::raw_storage_iterator<std::string*, std::string>(p.first));
        // has same effect as: std::uninitialized_copy(s, s + p.second, p.first);
        // requires that each string in p is individually destroyed
        // (beware of early exit points and exceptions)
    
        std::copy(p.first, p.first + p.second,
                  std::ostream_iterator<std::string>{std::cout, "\n"});
    
        std::for_each(p.first, p.first + p.second, & e)
        {
            e.~basic_string<char>();
        }); // same as: std::destroy(p.first, p.first + p.second);
    
        // manually reclaim memory if unique_ptr-like technique is not used:
        // std::return_temporary_buffer(p.first);
    }
```

Saída:
```
    string
    1
    test
    ...
    returning temporary buffer...
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 425](<https://cplusplus.github.io/LWG/issue425>) | C++98 | o comportamento quando count <= 0 era incerto | tornado claro
[LWG 2072](<https://cplusplus.github.io/LWG/issue2072>) | C++98 | não era permitido alocar memória insuficiente | permitido

### Veja também

[ return_temporary_buffer](<#/doc/memory/return_temporary_buffer>)(obsoleto em C++17)(removido em C++20) | libera armazenamento não inicializado
(function template)
[ allocate_at_least](<#/doc/memory/allocator_traits/allocate_at_least>)[static] (C++23) | aloca armazenamento pelo menos tão grande quanto o tamanho solicitado via um alocador
(public static member function of `std::allocator_traits<Alloc>`)