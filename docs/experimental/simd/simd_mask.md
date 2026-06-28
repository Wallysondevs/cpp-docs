# std::experimental::simd_mask

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi = simd_abi::compatible<T> >
class simd_mask;
```

O template de classe `simd_mask` é um tipo de dados paralelo com o tipo de elemento bool. A largura de uma dada instanciação de `simd_mask` é uma expressão constante, determinada pelos parâmetros do template. Especificamente, simd_mask<T, Abi>::size() é sempre simd<T, Abi>::size().

### Parâmetros do template

- **T** — o tipo de elemento no qual `simd_mask` se aplica
- **Abi** — o tipo ABI no qual `simd_mask` se aplica

### Templates de alias auxiliares

Template | Definição
---|---
template< class T, int N > using fixed_size_simd_mask | simd_mask<T, simd_abi::fixed_size&lt;N&gt;>
template< class T > using native_simd_mask | simd_mask<T, simd_abi::native&lt;T&gt;>

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | bool
`reference` | definido pela implementação
`simd_type` | simd<T, Abi>
`abi_type` | Abi

### Funções membro

[ (construtor)](<#/doc/experimental/simd/simd_mask/simd_mask>)(parallelism TS v2) | constrói um objeto `simd_mask`
(função membro pública)
[ copy_from](<#/doc/experimental/simd/simd_mask/copy_from>)(parallelism TS v2) | carrega elementos de `simd_mask` de memória contígua
(função membro pública)
[ copy_to](<#/doc/experimental/simd/simd_mask/copy_to>)(parallelism TS v2) | armazena elementos de `simd_mask` em memória contígua
(função membro pública)
[ operator[]](<#/doc/experimental/simd/simd_mask/operator_at>)(parallelism TS v2) | acessa o elemento especificado
(função membro pública)
[ operator!](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/simd_mask/operator_mem_logic&action=edit&redlink=1> "cpp/experimental/simd/simd mask/operator mem logic \(page does not exist\)")(parallelism TS v2) | nega cada elemento
(função membro pública)
[ size](<#/doc/experimental/simd/simd_mask/size>)[static] (parallelism TS v2) | retorna a largura / número de elementos
(função membro estática pública)

### Funções não-membro

[ operator&& operator||](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/simd_mask/operator_logic&action=edit&redlink=1> "cpp/experimental/simd/simd mask/operator logic \(page does not exist\)")(parallelism TS v2) | operadores lógicos elemento a elemento
(função)
[ operator& operator| operator^](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/simd_mask/operator_bitwise&action=edit&redlink=1> "cpp/experimental/simd/simd mask/operator bitwise \(page does not exist\)")(parallelism TS v2) | operadores bit a bit elemento a elemento
(função)
[ operator&= operator|= operator^=](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/simd_mask/operator_compound&action=edit&redlink=1> "cpp/experimental/simd/simd mask/operator compound \(page does not exist\)")(parallelism TS v2) | operadores compostos elemento a elemento
(função)
[ operator== operator!=](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/simd_mask/operator_relation&action=edit&redlink=1> "cpp/experimental/simd/simd mask/operator relation \(page does not exist\)")(parallelism TS v2) | operadores de relação elemento a elemento
(função)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ simd](<#/doc/experimental/simd/simd>)(parallelism TS v2) | tipo de vetor de dados paralelos
(template de classe)
[ mask_array](<#/doc/numeric/valarray/mask_array>) | proxy para um subconjunto de um valarray após aplicar uma máscara booleana `operator[]`
(template de classe)