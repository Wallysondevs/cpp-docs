# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::swap

```cpp
void swap( basic_stringbuf& rhs );  // (desde C++11)
(até C++20)
void swap( basic_stringbuf& rhs ) noexcept(/* see below */);  // (desde C++20)
```

  
Troca o estado e o conteúdo de `*this` e `rhs`.

O comportamento é indefinido se `Allocator` não se propaga na troca (propagate on swap) e os alocadores de `*this` e `other` são desiguais.  | (desde C++11)  
  
### Parâmetros

rhs  |  \-  |  outro `basic_stringbuf`  
  
### Valor de retorno

(nenhum) 

### Exceções

```cpp
Pode lançar exceções definidas pela implementação.  // (desde C++11)
(até C++20)
`noexcept` specification: noexcept(std::allocator_traits<Allocator>::propagate_on_container_swap::value
|| std::allocator_traits<Allocator>::is_always_equal::value)  // (desde C++20)
```
  
### Observações

Esta função é chamada automaticamente ao trocar objetos [std::stringstream](<#/doc/io/basic_stringstream>). Raramente é necessário chamá-la diretamente.

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    #include <string>
     
    int main()
    {
        std::istringstream one("one");
        std::ostringstream two("two");
     
        std::cout << "Before swap: one = " << std::quoted(one.str())
                  << ", two = " << std::quoted(two.str()) << ".\n";
     
        one.rdbuf()->swap(*two.rdbuf());
     
        std::cout << "After  swap: one = " << std::quoted(one.str())
                  << ", two = " << std::quoted(two.str()) << ".\n";
    }
```

Output: 
```
    Before swap: one = "one", two = "two".
    After  swap: one = "two", two = "one".
```

### Ver também

[ (construtor)](<#/doc/io/basic_stringbuf/basic_stringbuf>) |  constrói um objeto `basic_stringbuf`   
(função membro pública)  
[ swap](<#/doc/io/basic_stringstream/swap>)(C++11) |  troca dois *string streams*   
(função membro pública de `std::basic_stringstream<CharT,Traits,Allocator>`)