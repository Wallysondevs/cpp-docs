# std::philox_engine&lt;UIntType,w,n,r,consts&gt;::set_counter

void set_counter( const [std::array](<#/doc/container/array>)<result_type, n>& c ); |  |  (desde C++26)  

  
Define o [contador](<#/doc/numeric/random/philox_engine>) do motor de números aleatórios. 

  * Para cada inteiro k em `[`0`, `n`)`, define \\(\scriptsize X_k \\)Xk como \\(\scriptsize c_{n-1-k} \mod 2^w \\)cn-1-k mod 2w  
. 
  * O valor de j é definido como n - 1.[1](<#/doc/numeric/random/philox_engine/set_counter>)

  1. [↑](<#/doc/numeric/random/philox_engine/set_counter>) Como j está sendo definido como n - 1, a próxima transição de estado sempre gera novos valores aleatórios.

### Parâmetros

c  |  \-  |  sequência de contador a ser usada para definir o contador   
  
### Complexidade

\\(\scriptsize O(n) \\)O(n). 

### Veja também

[ (construtor)](<#/doc/numeric/random/philox_engine/philox_engine>) |  constrói o motor   
(função membro pública)  
[ seed](<#/doc/numeric/random/philox_engine/seed>) |  define o estado atual do motor   
(função membro pública)