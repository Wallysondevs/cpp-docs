# operator==,!=,&lt;,&lt;=,&gt;,&gt;=(std::experimental::filesystem::path)

bool operator==( const path& lhs, const path& rhs ); |  (1)  |  (filesystem TS)  
---|---|---
bool operator!=( const path& lhs, const path& rhs ); |  (2)  |  (filesystem TS)  
bool operator<( const path& lhs, const path& rhs ); |  (3)  |  (filesystem TS)  
bool operator<=( const path& lhs, const path& rhs ); |  (4)  |  (filesystem TS)  
bool operator>( const path& lhs, const path& rhs ); |  (5)  |  (filesystem TS)  
bool operator>=( const path& lhs, const path& rhs ); |  (6)  |  (filesystem TS)  

  
Compara dois paths lexicograficamente.

1) Verifica se lhs e rhs são iguais. Equivalente a !(lhs < rhs) && !(rhs < lhs).

2) Verifica se lhs e rhs não são iguais. Equivalente a !(lhs == rhs).

3) Verifica se lhs é menor que rhs. Equivalente a lhs.compare(rhs) < 0.

4) Verifica se lhs é menor ou igual a rhs. Equivalente a !(rhs < lhs).

5) Verifica se lhs é maior que rhs. Equivalente a rhs < lhs.

6) Verifica se lhs é maior ou igual a rhs. Equivalente a !(lhs < rhs).

### Parâmetros

lhs, rhs  |  \-  |  os paths a comparar   
  
### Valor de retorno

`true` se a comparação correspondente for verdadeira, `false` caso contrário.

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept

### Observações

A igualdade e a equivalência de paths têm semânticas diferentes.

No caso de igualdade, conforme determinado por `operator==`, apenas as representações lexicais são comparadas. Portanto, `path("a") == path("b")` nunca é `true`.

No caso de equivalência, conforme determinado por [`equivalent()`](<#/doc/experimental/fs/equivalent>), é verificado se dois paths _resolvem_ para o mesmo objeto do sistema de arquivos. Assim, `equivalent("a", "b")` retornará `true` se os paths resolverem para o mesmo arquivo.

### Veja também

[ compare](<#/doc/experimental/fs/path/compare>) | compara as representações lexicais de dois paths lexicograficamente   
(função membro pública)  