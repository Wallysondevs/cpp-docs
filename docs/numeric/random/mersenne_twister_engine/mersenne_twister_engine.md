# std::mersenne_twister_engine&lt;UIntType,w,n,m,r,a,u,d,s,b,t,c,l,f&gt;::mersenne_twister_engine

```cpp
mersenne_twister_engine() : mersenne_twister_engine(default_seed) {}  // (1) (desde C++11)
explicit mersenne_twister_engine( result_type value );  // (2) (desde C++11)
template< class SeedSeq >
explicit mersenne_twister_engine( SeedSeq& seq );  // (3) (desde C++11)
mersenne_twister_engine( const mersenne_twister_engine& other );  // (4) (desde C++11)
(declarado implicitamente)
```

  
Constrói o motor de números pseudoaleatórios. 

1) O construtor padrão. 

  * Se o motor construído por padrão for do tipo `std::mt19937`, a 10000ª invocação consecutiva dele produz o valor 4123659995. 
  * Se o motor construído por padrão for do tipo `std::mt19937_64`, a 10000ª invocação consecutiva dele produz o valor 9981545732273789042.

2) Constrói o motor com um valor de semente value. Dado \\(\scriptsize 2^w \\)2w  
como p, o [estado](<#/doc/numeric/random/mersenne_twister_engine>) inicial do motor é determinado da seguinte forma: 

  1. Define \\(\scriptsize X_{-n} \\)X-n como value % p. 
  2. Para cada inteiro i em `[`i - n`, `-1`]`, define \\(\scriptsize X_i \\)Xi como \\(\scriptsize [f \cdot (X_{i-1}\ \mathsf{xor}\ (X_{i-1}\ \mathsf{rshift}\ (w-2)))+i \mod n] \mod p \\)[f·(Xi-1 xor (Xi-1 rshift (w-2)))+i mod n] mod p, onde \\(\scriptsize \mathsf{xor} \\)xor e \\(\scriptsize \mathsf{rshift} \\)rshift representam os operadores [XOR bit a bit](<#/doc/language/operator_arithmetic>) e [deslocamento à direita bit a bit](<#/doc/language/operator_arithmetic>) embutidos, respectivamente.

3) Constrói o motor com uma seed sequence seq. Dado [std::size_t](<#/doc/types/size_t>)(w / 32) + 1 como k, o [estado](<#/doc/numeric/random/mersenne_twister_engine>) inicial do motor é determinado da seguinte forma: 

  1. Cria um objeto array inventado a de comprimento n * k. 
  2. Chama seq.generate(a + 0, a + n * k). 
  3. Para cada inteiro i em `[`-n`, `-1`]`, define \\(\scriptsize X_{i} \\)Xi como \\(\scriptsize (\sum^{k-1}_{j=0} a_{k(i+n)+j} \cdot 2^{32j}) \mod 2^w \\)(∑k-1  
j=0 ak(i+n)+j·232j  
) mod 2w  
. 
  4. Se os w − r bits mais significativos de \\(\scriptsize X_{-n} \\)X-n forem zero, e se cada um dos outros \\(\scriptsize X_{i} \\)Xi resultantes for ​0​, altera \\(\scriptsize X_{-n} \\)X-n para \\(\scriptsize 2^{w-1} \\)2w-1  
.

Esta sobrecarga participa da resolução de sobrecarga apenas se `SeedSeq` atender aos requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) O construtor de cópia. Após a construção, *this == other é verdadeiro.

### Parameters

value  |  \-  |  valor de semente a ser usado na inicialização do estado interno   
---|---|---
seq  |  \-  |  seed sequence a ser usada na inicialização do estado interno   
  
### Complexity

1,2) \\(\scriptsize O(n) \\)O(n).

3) Igual à complexidade da chamada `seq.generate`.

4) \\(\scriptsize O(n) \\)O(n).

### Exceptions

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Example

| Esta seção está incompleta  
Razão: demonstrações para as sobrecargas (2-4) são necessárias   
  
Execute este código
```cpp
    #include <cassert>
    #include <random>
     
    int main()
    {
        std::mt19937 gen32; // overload (1)
        std::mt19937_64 gen64; // overload (1)
        gen32.discard(10000 - 1);
        gen64.discard(10000 - 1);
        assert(gen32() == 4123659995);
        assert(gen64() == 9981545732273789042ull);
    }
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11  | a sobrecarga ([3](<#/doc/numeric/random/mersenne_twister_engine/mersenne_twister_engine>)) não lançaria exceção mesmo se a chamada `seq.generate` lançasse  | propaga a exceção   
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | o construtor padrão era explicit  | tornou-se implícito   
  
### See also

[ seed](<#/doc/numeric/random/mersenne_twister_engine/seed>) |  define o estado atual do motor   
(função membro pública)  