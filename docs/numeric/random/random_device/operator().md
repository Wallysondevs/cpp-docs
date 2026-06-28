# std::random_device::operator()

```cpp
result_type operator()();  // (desde C++11)
```

  
Gera um valor aleatório não determinístico uniformemente distribuído. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um número aleatório uniformemente distribuído em [min(), max()]. 

### Exceções

Lança uma exceção definida pela implementação derivada de [std::exception](<#/doc/error/exception>) se um número aleatório não puder ser gerado. 

### Veja também

[ min](<#/doc/numeric/random/random_device/min>)[static] |  obtém o menor valor possível no range de saída   
(função membro estática pública)  
[ max](<#/doc/numeric/random/random_device/max>)[static] |  obtém o maior valor possível no range de saída   
(função membro estática pública)