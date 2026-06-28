# std::experimental::simd&lt;T,Abi&gt;::operator+,-,*,/,%,&amp;,|,^,&lt;&lt;,&gt;&gt;

friend simd operator+( const simd& lhs, const simd& rhs ) noexcept; |  (1)  |  (parallelism TS v2)  
---|---|---
friend simd operator-( const simd& lhs, const simd& rhs ) noexcept; |  (2)  |  (parallelism TS v2)  
friend simd operator*( const simd& lhs, const simd& rhs ) noexcept; |  (3)  |  (parallelism TS v2)  
friend simd operator/( const simd& lhs, const simd& rhs ) noexcept; |  (4)  |  (parallelism TS v2)  
friend simd operator%( const simd& lhs, const simd& rhs ) noexcept; |  (5)  |  (parallelism TS v2)  
friend simd operator&( const simd& lhs, const simd& rhs ) noexcept; |  (6)  |  (parallelism TS v2)  
friend simd operator|( const simd& lhs, const simd& rhs ) noexcept; |  (7)  |  (parallelism TS v2)  
friend simd operator^( const simd& lhs, const simd& rhs ) noexcept; |  (8)  |  (parallelism TS v2)  
friend simd operator<<( const simd& lhs, const simd& rhs ) noexcept; |  (9)  |  (parallelism TS v2)  
friend simd operator<<( const simd& lhs, int n ) noexcept; |  (10)  |  (parallelism TS v2)  
friend simd operator>>( const simd& lhs, const simd& rhs ) noexcept; |  (11)  |  (parallelism TS v2)  
friend simd operator>>( const simd& lhs, int n ) noexcept; |  (12)  |  (parallelism TS v2)  

  
Aplica o operador binário fornecido elemento a elemento a cada elemento correspondente dos operandos. Retorna um [`simd`](<#/doc/experimental/simd/simd>) tal que para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)` o i-ésimo elemento é igual a: 

1) lhs[i] + rhs[i]

2) lhs[i] - rhs[i]

3) lhs[i] * rhs[i]

4) lhs[i] / rhs[i]

5) lhs[i] % rhs[i]

6) lhs[i] & rhs[i]

7) lhs[i] | rhs[i]

8) lhs[i] ^ rhs[i]

9) lhs[i] << rhs[i]

10) lhs[i] << n

11) lhs[i] >> rhs[i]

12) lhs[i] >> n

### Parâmetros

lhs  |  \-  |  operando esquerdo   
---|---|---
rhs  |  \-  |  operando direito   
n  |  \-  |  número de bits para deslocar cada elemento em lhs  
  
### Valor de retorno

Um [`simd`](<#/doc/experimental/simd/simd>) conforme descrito acima. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator+=  operator-=  operator*=  operator/=  operator%=  operator&=  operator|=  operator^=  operator<<=  operator>>=](<#/doc/experimental/simd/simd/operator_compound>)(parallelism TS v2) |  operadores binários compostos elemento a elemento   
(function)  