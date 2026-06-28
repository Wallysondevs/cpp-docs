# std::thread::operator=

```cpp
thread& operator=( thread&& other ) noexcept;  // (desde C++11)
```

  
Se `*this` ainda tiver um thread em execução associado (ou seja, `joinable() == true`), chama [std::terminate](<#/doc/error/terminate>)(). Caso contrário, atribui o estado de `other` a `*this` e define `other` para um estado construído por padrão.

Após esta chamada, [this->get_id()](<#/doc/thread/thread/get_id>) é igual ao valor de [other.get_id()](<#/doc/thread/thread/get_id>) antes da chamada, e `other` não representa mais um thread de execução.

### Parâmetros

other  |  \-  |  outro objeto `thread` para atribuir a este objeto `thread`   
  
### Valor de retorno

`*this`