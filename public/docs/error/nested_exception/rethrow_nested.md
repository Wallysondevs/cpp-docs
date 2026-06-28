# std::nested_exception::rethrow_nested

```cpp
[[noreturn]] void rethrow_nested() const;  // (desde C++11)
(constexpr desde C++26)
```

  
Relança a exceção armazenada. Se não houver exceções armazenadas (ou seja, [nested_ptr()](<#/doc/error/nested_exception/nested_ptr>) retornar um ponteiro nulo), então [std::terminate](<#/doc/error/terminate>) é chamado. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 