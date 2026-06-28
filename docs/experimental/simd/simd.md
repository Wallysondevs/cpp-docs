# std::experimental::simd

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi = simd_abi::compatible<T> >
class simd;
```

O template de classe `simd` é um tipo de dados paralelo. A largura de uma dada instanciação de `simd` é uma expressão constante, determinada pelos parâmetros do template.

Uma tag ABI é um tipo no namespace `simd_abi` que indica uma escolha de tamanho e representação binária para objetos do tipo de dados paralelo.

### Parâmetros do template

- **T** — tipo do elemento; um tipo aritmético diferente de bool
- **Abi** — tipo de tag usado para determinar o número de elementos e o armazenamento

### Templates de alias auxiliares

template< class T, int N >
using fixed_size_simd = std::experimental::simd<T, std::experimental::simd_abi::fixed_size&lt;N&gt;>;
template< class T >
using native_simd = std::experimental::simd<T, std::experimental::simd_abi::native&lt;T&gt;>;

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | T
`reference` | definido pela implementação
`mask_type` | simd_mask<T, Abi>
`abi_type` | Abi

### Funções membro

[ (construtor)](<#/doc/experimental/simd/simd/simd>)(parallelism TS v2) | constrói um objeto `simd`
(função membro pública)
[ copy_from](<#/doc/experimental/simd/simd/copy_from>)(parallelism TS v2) | carrega elementos `simd` de memória contígua
(função membro pública)
[ copy_to](<#/doc/experimental/simd/simd/copy_to>)(parallelism TS v2) | armazena elementos `simd` em memória contígua
(função membro pública)
[ operator[]](<#/doc/experimental/simd/simd/operator_at>)(parallelism TS v2) | acessa o elemento especificado
(função membro pública)
[ operator++ operator--](<#/doc/experimental/simd/simd/operator_mem_arith>)(parallelism TS v2) | incremento e decremento elemento a elemento
(função membro pública)
[ operator! operator~ operator+ operator-](<#/doc/experimental/simd/simd/operator_mem_arith2>)(parallelism TS v2) | operadores unários elemento a elemento
(função membro pública)
[ size](<#/doc/experimental/simd/simd/size>)[static] (parallelism TS v2) | retorna a largura / número de elementos
(função membro estática pública)

### Funções não-membro

[ operator+ operator- operator* operator/ operator% operator& operator| operator^ operator<< operator>>](<#/doc/experimental/simd/simd/operator_arith>)(parallelism TS v2) | operadores binários elemento a elemento
(função)
[ operator+= operator-= operator*= operator/= operator%= operator&= operator|= operator^= operator<<= operator>>=](<#/doc/experimental/simd/simd/operator_compound>)(parallelism TS v2) | operadores binários compostos elemento a elemento
(função)
[ operator== operator!= operator>= operator<= operator> operator<](<#/doc/experimental/simd/simd/operator_cmp>)(parallelism TS v2) | operadores relacionais elemento a elemento
(função)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ simd_mask](<#/doc/experimental/simd/simd_mask>)(parallelism TS v2) | tipo de dados paralelo com o tipo de elemento bool
(template de classe)
[ valarray](<#/doc/numeric/valarray>) | arrays numéricos, máscaras de array e fatias de array
(template de classe)