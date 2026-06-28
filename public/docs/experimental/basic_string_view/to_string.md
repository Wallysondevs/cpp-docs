```cpp
# std::experimental::basic_string_view<CharT,Traits>::to_string, std::experimental::basic_string_view<CharT,Traits>::operator basic_string

template<class Allocator = allocator<CharT>>  
basic_string<CharT, Traits, Allocator>  
to_string(const Allocator& a = Allocator()) const; |  |  (library fundamentals TS)  
---|---|---  
template<class Allocator>  
explicit operator basic_string<CharT, Traits, Allocator>() const; |  |  (library fundamentals TS)  
| |   
  
Cria uma `basic_string` com uma cópia do conteúdo da view atual. 

### Parâmetros de template

Allocator  |  \-  |  Tipo Allocator usado para alocar armazenamento interno   
---|---|---  
  
### Parâmetros

a  |  \-  |  Instância de Allocator a ser usada para alocar a nova string   
---|---|---  
  
### Valor de retorno

Uma `basic_string` contendo uma cópia dos caracteres da view atual. 

### Complexidade

Linear em `size()`
```