# std::bad_exception::operator=

```cpp
bad_exception& operator=( const bad_exception& other ) throw();  // (até C++11)
bad_exception& operator=( const bad_exception& other ) noexcept;  // (desde C++11)
(constexpr desde C++26)
```

  
Atribui o conteúdo de other. Se *this e other ambos tiverem o tipo dinâmico `std::exception`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.(desde C++11)

### Parâmetros

other  |  \-  |  outro objeto `bad_exception` para atribuir   
  
### Valor de retorno

*this. 