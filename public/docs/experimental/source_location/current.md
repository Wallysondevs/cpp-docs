# std::experimental::source_location::current

static constexpr source_location current() noexcept; | | (library fundamentals TS v2)

Constrói um novo objeto `source_location`.

### Valor de retorno

Se `current()` for invocado diretamente (através de uma chamada de função que nomeia `current()`), ele retorna um objeto `source_location` com valores definidos pela implementação, representando a localização da chamada. Os valores devem ser afetados pela [diretiva de pré-processador #line](<#/doc/preprocessor/line>) da mesma forma que as macros predefinidas `__LINE__` e `__FILE__`.

Se `current()` for invocado de qualquer outra maneira, o valor de retorno é não especificado.

### Observações

Se `current()` for usado em um [inicializador para um membro de dados não estático](<#/doc/language/data_members>), o valor de retorno corresponde à localização do construtor ou [inicialização de agregado](<#/doc/language/aggregate_initialization>) que inicializa o membro de dados.

### Notas

Quando `current()` é usado em um argumento padrão, o valor de retorno corresponderá à localização da chamada para `current()` no local da chamada.

### Parâmetros

(nenhum)

### Veja também

[ (construtor)](<#/doc/experimental/source_location/source_location>) | constrói um novo `source_location` com valores definidos pela implementação
(função membro pública)