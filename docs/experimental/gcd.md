# std::experimental::gcd

Definido no cabeçalho `[<experimental/numeric>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/numeric&action=edit&redlink=1> "cpp/header/experimental/numeric \(page does not exist\)")`

```c
template< class M, class N>
constexpr std::common_type_t<M, N> gcd( M m, N n );
```

  
Calcula o maior divisor comum dos inteiros m e n. 

### Parâmetros

m, n  |  \-  |  valores inteiros   
  
### Valor de retorno

Se ambos m e n forem zero, retorna zero. Caso contrário, retorna o maior divisor comum de |m| e |n|. 

### Observações

Se `M` ou `N` não for um tipo inteiro, ou se qualquer um for `bool` (possivelmente cv-qualificado), o programa é malformado. 

Se |m| ou |n| não for representável como um valor do tipo [std::common_type_t](<#/doc/types/common_type>)<M, N>, o comportamento é indefinido. 

### Exceções

Não lança exceções. 

### Ver também

[ lcm](<#/doc/experimental/lcm>) |  `constexpr` function template que retorna o mínimo múltiplo comum de dois inteiros   
(function template)  