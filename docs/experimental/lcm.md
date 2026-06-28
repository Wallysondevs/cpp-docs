Definido no header `[<experimental/numeric>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/numeric&action=edit&redlink=1> "cpp/header/experimental/numeric \(page does not exist\)")`

```cpp
template< class M, class N >
constexpr std::common_type_t<M, N> lcm( M m, N n );
```

  
Calcula o mínimo múltiplo comum dos inteiros m e n. 

### Parâmetros

m, n  |  \-  |  valores inteiros   
  
### Valor de retorno

Se m ou n for zero, retorna zero. Caso contrário, retorna o mínimo múltiplo comum de |m| e |n|. 

### Observações

Se `M` ou `N` não for um tipo inteiro, ou se qualquer um for `bool` (possivelmente cv-qualified), o programa é malformado. 

O comportamento é indefinido se |m|, |n| ou o mínimo múltiplo comum de |m| e |n| não for representável como um valor do tipo `std::common_type_t<M, N>`. 

### Exceções

Não lança exceções. 

### Veja também

[ gcd](<#/doc/experimental/gcd>) |  template de função `constexpr` que retorna o máximo divisor comum de dois inteiros   
(template de função)  