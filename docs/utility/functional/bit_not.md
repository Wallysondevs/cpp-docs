# std::bit_not

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T = void >
struct bit_not;
```

Objeto de função para realizar o NOT bit a bit. Efetivamente chama operator~ no tipo `T`.

### Especializações

A biblioteca padrão fornece uma especialização de `std::bit_not` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos.

[ bit_not&lt;void&gt;](<#/doc/utility/functional/bit_not_void>)(C++14) | objeto de função que implementa ~x deduzindo tipos de parâmetro e de retorno
(especialização de template de classe)

### Tipos de membro

Tipo | Definição
---|---
`result_type` (obsoleto em C++17)(removido em C++20) | `T`
`argument_type` (obsoleto em C++17)(removido em C++20) | `T`

### Funções membro

operator()(C++14) | retorna o resultado do NOT bit a bit de seu argumento
(função membro pública)

## std::bit_not::operator()

```cpp
constexpr T operator()( const T& arg ) const;  // (desde C++14)
```

Retorna o resultado do NOT bit a bit de arg.

### Parâmetros

- **arg** — valor para calcular o NOT bit a bit

### Valor de retorno

O resultado de ~arg.

### Exceções

Pode lançar exceções definidas pela implementação.

### Possível implementação
```cpp
    constexpr T operator()(const T& arg) const
    {
        return ~arg;
    }
```

---

### Notas

Embora `std::bit_not` seja adicionado via proposta pós-C++11 [N3421](<https://wg21.link/N3421>), ele é tratado como parte da resolução para o [problema LWG 660](<https://cplusplus.github.io/LWG/issue660>) (exceto por sua especialização transparente [`std::bit_not<>`](<#/doc/utility/functional/bit_not_void>)) por implementações comuns, e, portanto, disponível em seu modo C++98/03.