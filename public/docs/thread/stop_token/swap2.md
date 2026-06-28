# swap(std::stop_token)

```cpp
friend void swap( stop_token& lhs, stop_token& rhs ) noexcept;  // (desde C++20)
```

  
Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::stop_token](<#/doc/thread/stop_token>). Troca o stop-state associado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`.

Esta função não é visível para a pesquisa (lookup) comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento (ADL)](<#/doc/language/adl>) quando `std::stop_token` é uma classe associada dos argumentos.

### Parâmetros

lhs, rhs  |  \-  |  `stop_tokens` para trocar   
  
### Valor de retorno

(nenhum) 