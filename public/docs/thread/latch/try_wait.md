# std::latch::try_wait

```cpp
bool try_wait() const noexcept;  // (desde C++20)
```

  
Retorna true apenas se o contador interno tiver atingido zero. Esta função pode retornar false espuriamente com probabilidade muito baixa, mesmo que o contador interno tenha atingido zero.

### Parâmetros

(nenhum)

### Valor de retorno

Com probabilidade muito baixa, false; caso contrário, cnt == 0, onde `cnt` é o valor do contador interno.

### Observações

A razão pela qual um resultado espúrio é permitido é para permitir que as implementações usem uma ordem de memória mais relaxada do que [std::memory_order_seq_cst](<#/doc/atomic/memory_order>).