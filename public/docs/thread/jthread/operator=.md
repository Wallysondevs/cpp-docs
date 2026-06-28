# std::jthread::operator=

```cpp
std::jthread& operator=( std::jthread&& other ) noexcept;  // (desde C++20)
```

Se `*this` ainda possui um thread associado em execução (isto é, `joinable() == true`), chama `request_stop()` seguido por `join()`. Atribui o estado de `other` a `*this` e define `other` para um estado construído por padrão.

Após esta chamada, `this->get_id()` é igual ao valor de `other.get_id()` antes da chamada e o stop-state associado também é movido, e `other` não representa mais um thread de execução nem possui qualquer stop-state.

### Parâmetros

- **other** — outro objeto `jthread` para atribuir a este objeto `jthread`

### Valor de retorno

`*this`