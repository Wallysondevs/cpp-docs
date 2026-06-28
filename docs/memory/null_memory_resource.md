# std::pmr::null_memory_resource

Definido no cabeçalho `[<memory_resource>](<#/doc/header/memory_resource>)`

```c
std::pmr::memory_resource* null_memory_resource() noexcept;
```

Retorna um ponteiro para um `memory_resource` que não realiza nenhuma alocação.

### Valor de retorno

Retorna um ponteiro `p` para um objeto com duração de armazenamento estática de um tipo derivado de [std::pmr::memory_resource](<#/doc/memory/memory_resource>), com as seguintes propriedades:

  * sua função `allocate()` sempre lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>);
  * sua função `deallocate()` não tem efeito;
  * para qualquer `memory_resource` `r`, p->is_equal(r) retorna &r == p.

O mesmo valor é retornado toda vez que esta função é chamada.

### Exemplo

O programa demonstra o uso principal de `null_memory_resource`: garantir que um pool de memória que requer memória alocada na stack NÃO alocará memória no heap se precisar de mais memória.

Execute este código
```cpp
    #include <array>
    #include <cstddef>
    #include <iostream>
    #include <memory_resource>
    #include <string>
    #include <unordered_map>
    
    int main()
    {
        // allocate memory on the stack
        std::array<std::byte, 20000> buf;
    
        // without fallback memory allocation on heap
        std::pmr::monotonic_buffer_resource pool{buf.data(), buf.size(),
                                                 std::pmr::null_memory_resource()};
    
        // allocate too much memory
        std::pmr::unordered_map<long, std::pmr::string> coll{&pool};
        try
        {
            for (std::size_t i = 0; i < buf.size(); ++i)
            {
                coll.emplace(i, "just a string with number " + std::to_string(i));
    
                if (i && i % 50 == 0)
                    std::clog << "size: " << i << "...\n";
            }
        }
        catch (const std::bad_alloc& e)
        {
            std::cerr << e.what() << '\n';
        }
    
        std::cout << "size: " << coll.size() << '\n';
    }
```

Saída possível:
```
    size: 50...
    size: 100...
    size: 150...
    std::bad_alloc
    size: 183
```