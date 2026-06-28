# std::stop_source::get_token

```cpp
std::stop_token get_token() const noexcept;  // (desde C++20)
```

Retorna um objeto `stop_token` associado ao stop-state do `stop_source`, se o `stop_source` possui stop-state; caso contrário, retorna um `stop_token` construído por padrão (vazio).

### Parâmetros

(nenhum)

### Valor de retorno

Um objeto `stop_token`, que estará vazio se this->stop_possible() == false.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo