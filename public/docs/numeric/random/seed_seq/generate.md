# std::seed_seq::generate

```cpp
template< class RandomIt >  
void generate( RandomIt begin, RandomIt end );
```
| | (desde C++11)

  
Gera sementes não viciadas preenchendo o range de saída `[`begin`, `end`)` com valores inteiros sem sinal de 32 bits, com base nas sementes (possivelmente viciadas) armazenadas em `_[v](<#/doc/numeric/random/seed_seq>)_`. 

  * Se begin == end for verdadeiro, não faz nada. 
  * Caso contrário, gera sementes pelo algoritmo de geração descrito abaixo. 

Se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt&gt;::value_type não for um tipo inteiro sem sinal, ou sua largura for menor que 32, o programa é malformado. 

Se `RandomIt` não atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), ou não for [mutável](<#/doc/iterator>), o comportamento é indefinido. 

### Algoritmo de geração

Dados os seguintes valores e operações: 

Valor | Definição   
---|---
z | `_[v](<#/doc/numeric/random/seed_seq>)_` ﻿.size()  
n | end - begin  
m | [std::max](<#/doc/algorithm/max>)(z + 1, n)  
t | (n >= 623) ? 11 : (n >= 68) ? 7 : (n >= 39) ? 5 : (n >= 7) ? 3 : (n - 1) / 2  
p | (n - t) / 2  
q | p + t  
Operação | Definição   
\\(\scriptsize \mathsf{xor} \\)xor | [XOR bit a bit](<#/doc/language/operator_arithmetic>) embutido
\\(\scriptsize \mathsf{rshift} \\)rshift | [deslocamento à direita bit a bit](<#/doc/language/operator_arithmetic>) embutido
\\(\scriptsize T(x) \\)T(x) | \\(\scriptsize x\ \mathsf{xor}\ (x\ \mathsf{rshift}\ 27) \\)x xor (x rshift 27)  
  
O algoritmo de geração consiste nos seguintes passos, onde \\(\scriptsize S_i \\)Si denota begin[i % n], \\(\scriptsize V_i \\)Vi denota `_[v](<#/doc/numeric/random/seed_seq>)_` ﻿[i]: 

1) Define cada elemento do range de saída para o valor 0x8b8b8b8b.

2) Para cada inteiro k em `[`​0​`, `m`)`, executa as seguintes operações em ordem:

1) Seja \\(\scriptsize r_1 \\)r1 \\(\scriptsize 1664525 \cdot T(S_k\ \mathsf{xor}\ S_{k+p}\ \mathsf{xor}\ S_{k-1}) \\)1664525·T(Sk xor Sk+p xor Sk-1).

2) Seja \\(\scriptsize r_2 \\)r2 \\(\scriptsize r_1 + j \\)r1+j, onde \\(\scriptsize j \\)j é: 

  * \\(\scriptsize z \\)z, se \\(\scriptsize k=0 \\)k=0
  * \\(\scriptsize (k \mod n)+V_{k-1} \\)(k mod n)+Vk-1, se \\(\scriptsize 0<k⩽z \\)0<k⩽z
  * \\(\scriptsize k \mod n \\)k mod n, se \\(\scriptsize z<k \\)z<k

3) Define \\(\scriptsize S_{k+p} \\)Sk+p para \\(\scriptsize (S_{k+p}+r_1) \mod 2^{32} \\)(Sk+p+r1) mod 232.

4) Define \\(\scriptsize S_{k+q} \\)Sk+q para \\(\scriptsize (S_{k+q}+r_2) \mod 2^{32} \\)(Sk+q+r2) mod 232.

5) Define \\(\scriptsize S_k \\)Sk para \\(\scriptsize r_2 \mod 2^{32} \\)r2 mod 232.

3) Para cada inteiro k em `[`m`, `m + n`)`, executa as seguintes operações em ordem:

1) Seja \\(\scriptsize r_3 \\)r3 \\(\scriptsize 1566083941 \cdot T(S_k+S_{k+p}+S_{k-1}) \\)1566083941·T(Sk+Sk+p+Sk-1).

2) Seja \\(\scriptsize r_4 \\)r4 \\(\scriptsize r_3-(k \mod n) \\)r3-(k mod n).

3) Define \\(\scriptsize S_{k+p} \\)Sk+p para \\(\scriptsize (S_{k+p}\ \mathsf{xor}\ r_3) \mod 2^{32} \\)(Sk+p xor r3) mod 232.

4) Define \\(\scriptsize S_{k+q} \\)Sk+q para \\(\scriptsize (S_{k+q}\ \mathsf{xor}\ r_4) \mod 2^{32} \\)(Sk+q xor r4) mod 232.

5) Define \\(\scriptsize S_k \\)Sk para \\(\scriptsize r_4 \mod 2^{32} \\)r4 mod 232.

### Parâmetros

- **begin, end** — os iteradores que denotam o range de saída
  
### Exceções

Apenas lança as exceções lançadas pelas operações de `RandomIt` em begin e end. 

### Notas

O algoritmo de geração é adaptado da sequência de inicialização do gerador Mersenne Twister por [Makoto Matsumoto e Takuji Nishimura](<http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html>), incorporando as melhorias feitas por [Mutsuo Saito em 2007](<http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/SFMT/M062821.pdf>). 

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <cstdint>
    #include <iostream>
    #include <random>
     
    // Prototyping the main part of std::seed_seq...
    struct seed_seq
    {
        std::vector<std::uint32_t> v;
     
        seed_seq(std::initializer_list<std::uint32_t> const il) : v{il} {}
     
        template<typename RandomIt>
        void generate(RandomIt first, RandomIt last)
        {
            if (first == last)
                return;
            //
            // Assuming v = {1, 2, 3, 4, 5} and distance(first, last) == 10.
            //
            // Step 1: fill with 0x8b8b8b8b
            // seeds = {2341178251, 2341178251, 2341178251, 2341178251, 2341178251,
            //          2341178251, 2341178251, 2341178251, 2341178251, 2341178251}
            //
            std::fill(first, last, 0x8b8b8b8b);
            //
            // Step 2:
            // n = 10, s = 5, t = 3, p = 3, q = 6, m = 10
            //
            const std::uint32_t n = last - first;
            const std::uint32_t s = v.size();
            const std::uint32_t t = (n < 7) ? (n - 1) / 2
                                  : (n < 39) ? 3
                                  : (n < 68) ? 5
                                  : (n < 623) ? 7
                                  : 11;
            const std::uint32_t p = (n - t) / 2;
            const std::uint32_t q = p + t;
            const std::uint32_t m = std::max(s + 1, n);
            //
            // First iteration, k = 0; r1 = 1371501266, r2 = 1371501271
            //
            // seeds = {1371501271, 2341178251, 2341178251, 3712679517, 2341178251,
            //          2341178251, 3712679522, 2341178251, 2341178251, 2341178251}
            //
            // Iterations from k = 1 to k = 5 (r2 = r1 + k % n + v[k - 1])
            //
            // r1 = 2786190137, 3204727651, 4173325571, 1979226628, 401983366
            // r2 = 2786190139, 3204727655, 4173325577, 1979226636, 401983376
            //
            // seeds = {3350727907, 3188173515, 3204727655, 4173325577, 1979226636,
            //           401983376, 3591037797, 2811627722, 1652921976, 2219536532}
            //
            // Iterations from k = 6 to k = 9 (r2 = r1 + k % n)
            //
            // r1 = 2718637909, 1378394210, 2297813071, 1608643617
            // r2 = 2718637915, 1378394217, 2297813079, 1608643626
            //
            // seeds = { 434154821, 1191019290, 3237041891, 1256752498, 4277039715,
            //          2010627002, 2718637915, 1378394217, 2297813079, 1608643626}
            //
            auto begin_mod = first, n u) -> decltype(*first)&
            {
                return first[u % n]; // i.e. begin[x] is taken modulo n
            };
            auto T =  x) { return x ^ (x >> 27); };
     
            for (std::uint32_t k = 0, r1, r2; k < m; ++k)
            {
                r1 = 1664525 * T(begin_mod(k) ^ begin_mod(k + p) ^ begin_mod(k - 1));
                r2 = (k == 0) ? r1 + s
                   : (k <= s) ? r1 + k % n + v[k - 1]
                   :            r1 + k % n;
                begin_mod(k + p) += r1;
                begin_mod(k + q) += r2;
                begin_mod(k) = r2;
            }
            //
            // Step 3
            // iterations from k = 10 to k = 19, using ^= to modify the output
            //
            // r1 = 1615303485, 3210438310, 893477041, 2884072672, 1918321961,
            // r2 = 1615303485, 3210438309, 893477039, 2884072669, 1918321957
            //
            // seeds = { 303093272, 3210438309,  893477039, 2884072669, 1918321957,
            //          1117182731, 1772877958, 2669970405, 3182737656, 4094066935}
            //
            // r1 =  423054846, 46783064, 3904109085, 1534123446, 1495905687
            // r2 =  423054841, 46783058, 3904109078, 1534123438, 1495905678
            //
            // seeds = { 4204997637, 4246533866, 1856049002, 1129615051, 690460811,
            //           1075771511,   46783058, 3904109078, 1534123438, 1495905678}
            //
            for (std::uint32_t k = m, r3, r4; k < m + n; ++k)
            {
                r3 = 1566083941 * T(begin_mod(k) + begin_mod(k + p) + begin_mod(k - 1));
                r4 = r3 - k % n;
                begin_mod(k+p) ^= r3;
                begin_mod(k+q) ^= r4;
                begin_mod(k) = r4;
            }
        }
    };
     
    int main()
    {
        const auto input = std::initializer_list<std::uint32_t>{1, 2, 3, 4, 5};
        const auto output_size = 10;
     
        // using std version of seed_seq
        std::seed_seq seq(input);
        std::vector<std::uint32_t> seeds(output_size);
        seq.generate(seeds.begin(), seeds.end());
        for (const std::uint32_t n : seeds)
            std::cout << n << '\n';
     
        // using custom version of seed_seq
        seed_seq seq2(input);
        std::vector<std::uint32_t> seeds2(output_size);
        seq2.generate(seeds2.begin(), seeds2.end());
     
        assert(seeds == seeds2);
    }
```

Saída: 
```
    4204997637
    4246533866
    1856049002
    1129615051
    690460811
    1075771511
    46783058
    3904109078
    1534123438
    1495905678
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto   
---|---|---|---
[LWG 2180](<https://cplusplus.github.io/LWG/issue2180>) | C++11 | `seed_seq::generate` não lança exceções | pode lançar exceções 