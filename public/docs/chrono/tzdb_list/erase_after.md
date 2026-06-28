# std::chrono::tzdb_list::erase_after

```cpp
const_iterator erase_after( const_iterator p );  // (desde C++20)
```

  
Apaga o `std::chrono::tzdb` referenciado pelo iterator que segue `p`. O comportamento é indefinido se esse iterator não for desreferenciável. Nenhum ponteiro, referência ou iterator é invalidado, exceto aqueles que se referem ao elemento apagado. 

### Valor de retorno

Um iterator apontando para o elemento que segue o elemento apagado, ou `end()` se tal elemento não existir. 

### Observações

`tzdb_list` é projetada para ser implementável como uma lista encadeada simples, e sua interface se assemelha à de [std::forward_list](<#/doc/container/forward_list>). No entanto, ela não possui `before_begin()`, e portanto não é possível apagar o primeiro elemento. 