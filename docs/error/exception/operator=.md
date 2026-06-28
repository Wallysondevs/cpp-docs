# std::exception::operator=

```cpp
exception& operator=( const exception& other ) throw();  // (até C++11)
exception& operator=( const exception& other ) noexcept;  // (desde C++11)
(constexpr desde C++26)
```

  
Operador de atribuição de cópia. Atribui o conteúdo de other. 

Se *this e other ambos tiverem o tipo dinâmico `std::exception`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. 

### Parâmetros

other  |  \-  |  outra exceção para atribuir o conteúdo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98  | os efeitos de chamar [what()](<#/doc/error/exception/what>) após  
a atribuição são definidos pela implementação  | exigido ser o mesmo que o [what()](<#/doc/error/exception/what>) original  
se os tipos dinâmicos forem os mesmos 