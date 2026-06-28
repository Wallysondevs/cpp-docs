# std::bad_expected_access

Definido no cabeçalho `[<expected>](<#/doc/header/expected>)`

```c
template< class E >
class bad_expected_access : public std::bad_expected_access<void>
template<>
class bad_expected_access<void> : public std::exception
```

1) Define um tipo de objeto a ser lançado por [`std::expected::value`](<#/doc/utility/expected/value>) ao acessar um objeto expected que contém um valor inesperado. `bad_expected_access<E>` armazena uma cópia do valor inesperado.

2) `bad_expected_access<void>` é a classe base de todas as outras especializações de `bad_expected_access`.

| Esta seção está incompleta
Razão: diagrama de herança

### Membros do template primário

**(construtor)** | constrói um objeto `bad_expected_access`
(função membro pública)
error | retorna o valor armazenado
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_expected_access::bad_expected_access

explicit bad_expected_access( E e );

Constrói um novo objeto `bad_expected_access<E>`. Inicializa o valor armazenado com `std::move(e)`.

## std::bad_expected_access::error

const E& error() const & noexcept;
E& error() & noexcept;
const E&& error() const && noexcept;
E&& error() && noexcept;

Retorna uma referência para o valor armazenado.

## std::bad_expected_access::what

const char* what() const noexcept override;

Retorna a string explicativa.

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para uma string terminada em nulo com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

### Notas

Implementações são permitidas, mas não obrigadas a sobrescrever `what()`.

### Membros da especialização `bad_expected_access<void>`

(construtor) | constrói um objeto `bad_expected_access<void>`
(função membro protegida)
(destrutor) | destrói o objeto `bad_expected_access<void>`
(função membro protegida)
operator= | substitui o objeto `bad_expected_access<void>`
(função membro protegida)
what | retorna a string explicativa
(função membro pública)

Funções membro especiais de `bad_expected_access<void>` são protegidas. Elas só podem ser chamadas por classes derivadas.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo