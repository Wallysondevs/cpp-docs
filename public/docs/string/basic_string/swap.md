# std::basic_string&lt;CharT,Traits,Allocator&gt;::swap

```cpp
void swap( basic_string& other );  // (até C++17)
void swap( basic_string& other ) noexcept(/* see below */);  // (desde C++17)
(constexpr desde C++20)
```

  
Troca o conteúdo da string com o de `other`. Todos os iterators e referências podem ser invalidados. 

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::  
propagate_on_container_swap::value &&  
get_allocator() == s.get_allocator() for falso, o comportamento é indefinido.  | (desde C++11)  
  
### Parâmetros

other  |  \-  |  string para trocar o conteúdo   
  
### Complexidade

Constante. 

### Exceções

Nenhuma exceção é lançada.  | (até C++11)  
---|---
Nenhuma exceção é lançada, a menos que o comportamento seja indefinido. Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).  | (desde C++11)  
  

```cpp
`noexcept` specification: noexcept(std::allocator_traits<Allocator>::propagate_on_container_swap::value
std::allocator_traits<Allocator>::is_always_equal::value)  // (desde C++17)
```
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    int main() 
    {
        std::string a = "AAA";
        std::string b = "BBBB";
     
        std::cout << "Before swap:\n"
                     "a = " << a << "\n"
                     "b = " << b << "\n\n";
     
        a.swap(b);
     
        std::cout << "After swap:\n"
                     "a = " << a << "\n"
                     "b = " << b << '\n';
    }
```

Saída: 
```
    Before swap:
    a = AAA
    b = BBBB
     
    After swap:
    a = BBBB
    b = AAA
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 403](<https://cplusplus.github.io/LWG/issue403>) | C++98  | `swap()` poderia lançar uma exceção  | nenhuma exceção é lançada   
[LWG 535](<https://cplusplus.github.io/LWG/issue535>) | C++98  | a troca de strings não preservava a ordem dos caracteres  | as ordens também são preservadas   
[LWG 2151](<https://cplusplus.github.io/LWG/issue2151>)  
([P1148R0](<https://wg21.link/P1148R0>))  | C++11  | nenhuma exceção era lançada no caso  
de allocators desiguais e não propagantes  | o comportamento é  
indefinido neste caso   
  
### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)  
[ swap_ranges](<#/doc/algorithm/swap_ranges>) |  troca dois ranges de elementos   
(modelo de função)  
[ swap](<#/doc/string/basic_string_view/swap>) |  troca o conteúdo   
(função membro pública de `std::basic_string_view<CharT,Traits>`)