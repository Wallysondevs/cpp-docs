# std::mersenne_twister_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template<
class UIntType, std::size_t w, std::size_t n, std::size_t m, std::size_t r,
UIntType a, std::size_t u, UIntType d, std::size_t s,
UIntType b, std::size_t t, UIntType c, std::size_t l, UIntType f
> class mersenne_twister_engine;
```

`mersenne_twister_engine` é um motor de números aleatórios baseado no algoritmo [Mersenne Twister](<https://en.wikipedia.org/wiki/Mersenne_Twister> "enwiki:Mersenne Twister"). Ele produz números aleatórios inteiros sem sinal de alta qualidade, mas não criptograficamente seguros, do tipo `UIntType` no intervalo \\(\scriptsize {[0,2^w)}\\)[0, 2w
).

### Parâmetros de template

- **UIntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de unsigned short, unsigned int, unsigned long, ou unsigned long long.
- **w** — a potência de dois que determina o intervalo de valores gerados pelo motor
- **n** — o grau de recorrência
- **m** — a palavra do meio, um deslocamento usado na relação de recorrência que define o estado
- **r** — o número de bits da máscara de bits inferior, também conhecido como valor de twist
- **a** — a máscara xor condicional, ou seja, os coeficientes da matriz de twist de forma normal racional
- **u, d, s, b, t, c, l** — os 1º ao 7º componentes da matriz de embaralhamento de bits (temperagem)
- **f** — o multiplicador de inicialização

Se qualquer uma das seguintes restrições for violada, o programa é malformado:

*   m está em `[`1`, `n`]`.
*   As seguintes expressões são todas verdadeiras:

    *   w >= 3
    *   w >= r
    *   w >= u
    *   w >= s
    *   w >= t
    *   w >= l
    *   w <= [std::numeric_limits](<#/doc/types/numeric_limits>)<UIntType>::digits

*   Dado (1u << w) - 1u como w1, as seguintes expressões são todas verdadeiras:

    *   a <= w1
    *   b <= w1
    *   c <= w1
    *   d <= w1
    *   f <= w1

### Propriedades do gerador

O [tamanho](<#/doc/numeric/random>) dos estados de `mersenne_twister_engine` é n, cada um deles consiste em uma sequência X de n valores do tipo `result_type`. \\(\scriptsize X_j\\)Xj representa o \\(\scriptsize j\mod n\\)j mod n-ésimo valor (começando de 0) de X.

Dadas as seguintes notações de operações bit a bit:

*   \\(\scriptsize \mathsf{bitand}\\)bitand, [AND bit a bit](<#/doc/language/operator_arithmetic>) embutido.
*   \\(\scriptsize \mathsf{xor}\\)xor, [XOR bit a bit](<#/doc/language/operator_arithmetic>) embutido.
*   \\(\scriptsize \mathsf{lshift}\\)lshift, [deslocamento à esquerda bit a bit](<#/doc/language/operator_arithmetic>) embutido.
*   \\(\scriptsize \mathsf{rshift}\\)rshift, [deslocamento à direita bit a bit](<#/doc/language/operator_arithmetic>) embutido.

O [algoritmo de transição](<#/doc/numeric/random>) de `mersenne_twister_engine` (\\(\scriptsize TA(x_i)\\)TA(xi)) é definido como segue:

1.  Concatena os w - r bits superiores de \\(\scriptsize X_{i-n}\\)Xi-n com os r bits inferiores de \\(\scriptsize X_{i+1-n}\\)Xi+1-n para obter um valor inteiro sem sinal Y.
2.  Seja y igual a \\(\scriptsize a \cdot (Y\ \mathsf{bitand}\ 1)\\)a·(Y bitand 1), e defina \\(\scriptsize X_i\\)Xi como \\(\scriptsize X_{i+m−n}\ \mathsf{xor}\ (Y\ \mathsf{rshift}\ 1)\ \mathsf{xor}\ y\\)Xi+m−n xor (Y rshift 1) xor y.

O [algoritmo de geração](<#/doc/numeric/random>) de `mersenne_twister_engine` (\\(\scriptsize GA(x_i)\\)GA(xi)) é definido como segue:

1.  Seja \\(\scriptsize z_1\\)z1 igual a \\(\scriptsize X_i\ \mathsf{xor}\ ((X_i\ \mathsf{rshift}\ u)\ \mathsf{bitand}\ d)\\)Xi xor ((Xi rshift u) bitand d).
2.  Seja \\(\scriptsize z_2\\)z2 igual a \\(\scriptsize z_1\ \mathsf{xor}\ (((z_1\ \mathsf{lshift}\ s)\mod 2^w)\ \mathsf{bitand}\ b)\\)Xi xor (((Xi lshift s) mod 2w
    ) bitand b).
3.  Seja \\(\scriptsize z_3\\)z3 igual a \\(\scriptsize z_2\ \mathsf{xor}\ (((z_2\ \mathsf{lshift}\ t)\mod 2^w)\ \mathsf{bitand}\ c)\\)Xi xor (((Xi lshift t) mod 2w
    ) bitand c).
4.  Seja \\(\scriptsize z_4\\)z4 igual a \\(\scriptsize z_3\ \mathsf{xor}\ (z_3\ \mathsf{rshift}\ l)\\)z3 xor (z3 rshift l).
5.  Entrega \\(\scriptsize z_4\\)z4 como resultado (ou seja, \\(\scriptsize GA(x_i)=z_4\\)GA(xi)=z4).

### Especializações predefinidas

As seguintes especializações definem o motor de números aleatórios com dois conjuntos de parâmetros comumente usados:

Definido no cabeçalho `[<random>](<#/doc/header/random>)`
---
Tipo | Definição
---|---
`mt19937` (desde C++11) | std::mersenne_twister_engine<[std::uint_fast32_t](<#/doc/types/integer>),
` `32, 624, 397, 31,
` `0x9908b0df, 11,
` `0xffffffff, 7,
` `0x9d2c5680, 15,
` `0xefc60000, 18, 1812433253>
Mersenne Twister de 32 bits por Matsumoto e Nishimura, 1998
`mt19937_64` (desde C++11) | std::mersenne_twister_engine<[std::uint_fast64_t](<#/doc/types/integer>),
` `64, 312, 156, 31,
` `0xb5026f5aa96619e9, 29,
` `0x5555555555555555, 17,
` `0x71d67fffeda60000, 37,
` `0xfff7eee000000000, 43,
` `6364136223846793005>
Mersenne Twister de 64 bits por Matsumoto e Nishimura, 2000

### Tipos aninhados

Tipo | Definição
---|---
`result_type` | `UIntType`

### Membros de dados

constexpr size_t word_size[static] | w
(constante de membro estática pública)
constexpr size_t state_size[static] | n
(constante de membro estática pública)
constexpr size_t shift_size[static] | m
(constante de membro estática pública)
constexpr size_t mask_bits[static] | r
(constante de membro estática pública)
constexpr UIntType xor_mask[static] | a
(constante de membro estática pública)
constexpr size_t tempering_u[static] | u
(constante de membro estática pública)
constexpr UIntType tempering_d[static] | d
(constante de membro estática pública)
constexpr size_t tempering_s[static] | s
(constante de membro estática pública)
constexpr UIntType tempering_b[static] | b
(constante de membro estática pública)
constexpr size_t tempering_t[static] | t
(constante de membro estática pública)
constexpr UIntType tempering_c[static] | c
(constante de membro estática pública)
constexpr size_t tempering_l[static] | l
(constante de membro estática pública)
constexpr UIntType initialization_multiplier[static] | f
(constante de membro estática pública)
constexpr UIntType default_seed[static] | 5489u
(constante de membro estática pública)

### Funções membro

##### Construção e Sementeamento

---
[ (construtor)](<#/doc/numeric/random/mersenne_twister_engine/mersenne_twister_engine>) | constrói o motor
(função membro pública)
[ seed](<#/doc/numeric/random/mersenne_twister_engine/seed>) | define o estado atual do motor
(função membro pública)

##### Geração

[ operator()](<#/>) | avança o estado do motor e retorna o valor gerado
(função membro pública)
[ discard](<#/doc/numeric/random/mersenne_twister_engine/discard>) | avança o estado do motor por uma quantidade especificada
(função membro pública)

##### Características

[ min](<#/doc/numeric/random/mersenne_twister_engine/min>)[static] | obtém o menor valor possível no intervalo de saída
(função membro estática pública)
[ max](<#/doc/numeric/random/mersenne_twister_engine/max>)[static] | obtém o maior valor possível no intervalo de saída
(função membro estática pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/mersenne_twister_engine/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara os estados internos de dois motores de números pseudoaleatórios
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/mersenne_twister_engine/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream em motor de números pseudoaleatórios
(modelo de função)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo