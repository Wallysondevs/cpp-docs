# std::basic_string&lt;CharT,Traits,Allocator&gt;::reserve

```cpp
  // (1)
void reserve( size_type new_cap = 0 );  // (até C++20)
constexpr void reserve( size_type new_cap );  // (desde C++20)
void reserve();  // (2) (desde C++20)
(obsoleto em C++20)
(removido em C++26)
```

  
1) Informa um objeto `std::basic_string` sobre uma mudança planejada no tamanho, para que ele possa gerenciar a alocação de armazenamento apropriadamente. 

  * Se new_cap for maior que a [capacity()](<#/doc/string/basic_string/capacity>) atual, um novo armazenamento é alocado, e [capacity()](<#/doc/string/basic_string/capacity>) é tornada igual ou maior que new_cap. 

  * Se new_cap for menor que a [capacity()](<#/doc/string/basic_string/capacity>) atual, esta é uma solicitação de encolhimento não vinculativa. 
  * Se new_cap for menor que o [size()](<#/doc/string/basic_string/size>) atual, esta é uma solicitação de encolhimento para ajuste não vinculativa equivalente a [shrink_to_fit()](<#/doc/string/basic_string/shrink_to_fit>) (desde C++11). 

| (até C++20)  
  
  * Se new_cap for menor ou igual à [capacity()](<#/doc/string/basic_string/capacity>) atual, não há efeito. 

| (desde C++20)  
  
Se ocorrer uma mudança de capacidade, todos os iterators e referências, incluindo o iterator após o final, são invalidados. 

2) Uma solicitação de encolhimento para ajuste não vinculativa. Após esta chamada, [capacity()](<#/doc/string/basic_string/capacity>) tem um valor não especificado maior ou igual a [size()](<#/doc/string/basic_string/size>).

### Parâmetros

new_cap  |  \-  |  nova capacidade da string   
  
### Valor de retorno

(nenhum) 

### Exceções

Lança [std::length_error](<#/doc/error/length_error>) se new_cap for maior que [max_size()](<#/doc/string/basic_string/max_size>). 

Pode lançar quaisquer exceções lançadas por [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::allocate(), como [std::bad_alloc](<#/doc/memory/new/bad_alloc>). 

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexidade

No máximo linear no [size()](<#/doc/string/basic_string/size>) da string. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string s;
        std::cout << "1) Initially: " << s.capacity() << '\n';
     
        const std::string::size_type new_cap{101u};
        s.reserve(new_cap);
        assert(s.capacity() >= new_cap);
        std::cout << "2) After reserve(" << new_cap << "): " << s.capacity() << '\n';
     
        // observing the capacity growth factor
        auto cap{s.capacity()};
        for (int check{}; check != 4; ++check)
        {
            while (cap == s.capacity())
                s += '$';
            cap = s.capacity();
            std::cout << (3) + check << ") Capacity: " << cap << '\n';
        }
     
    //  s.reserve(); // deprecated/removed in C++20/26, use:
        s.shrink_to_fit();
        std::cout << "7) After shrink_to_fit: " << s.capacity() << '\n';
    }
```

Saída possível: 
```
    1) Initially: 15
    2) After reserve(101): 101
    3) Capacity: 202
    4) Capacity: 404
    5) Capacity: 808
    6) Capacity: 1616
    7) After shrink_to_fit: 809
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
  
### Veja também

[ capacity](<#/doc/string/basic_string/capacity>) |  retorna o número de caracteres que podem ser mantidos no armazenamento atualmente alocado   
(função membro pública)  
[ resize](<#/doc/string/basic_string/resize>) |  altera o número de caracteres armazenados   
(função membro pública)