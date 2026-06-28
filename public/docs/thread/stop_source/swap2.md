# swap(std::stop_source)

```cpp
friend void swap( stop_source& lhs, stop_source& rhs ) noexcept;  // (desde C++20)
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::stop_source](<#/doc/thread/stop_source>). Troca o estado de parada de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

Esta função não é visível para lookup não qualificado ou qualificado comum, e só pode ser encontrada por argument-dependent lookup quando std::stop_source é uma classe associada dos argumentos.

### Parâmetros

- **lhs, rhs** — `stop_source`s para trocar

### Valor de retorno

(nenhum)