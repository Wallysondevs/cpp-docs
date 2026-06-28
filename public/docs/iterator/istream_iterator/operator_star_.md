# std::istream_iterator&lt;T,CharT,Traits,Distance&gt;::operator*, operator-&gt;

```cpp
const T& operator*() const;  // (1)
const T* operator->() const;  // (2)
```

  
Retorna um ponteiro ou uma referência para o elemento atual. 

O comportamento é indefinido se o iterator for um iterator de fim de stream. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um ponteiro ou uma referência para o elemento atual. 

### Exceções

Pode lançar exceções definidas pela implementação. 