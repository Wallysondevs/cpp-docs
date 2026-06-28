# std::locale::facet

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class locale::facet;
```

`std::locale::facet` é a classe base para facets. Ela fornece uma classe base comum para que as locales possam armazenar ponteiros para os facets que implementam em um único container indexado, e abstrai o suporte para a contagem de referência de facets.

Sempre que um facet é adicionado a uma locale, a locale incrementa a contagem de referência no facet (através de um mecanismo específico da implementação). Sempre que uma locale é destruída ou modificada, ela decrementa a contagem de referência em cada facet que ela não implementa mais. Sempre que a contagem de referência de um facet se torna zero, a locale executa delete static_cast<std::locale::facet*>(f); onde f é o ponteiro para o facet.

### Classe Facet

Uma classe é um _facet_ se

*   ela é [derivada publicamente](<#/doc/language/derived_class>) de outro facet, ou
*   ela é uma classe derivada de `std::locale::facet` e contém uma declaração [publicamente acessível](<#/doc/language/access>) como segue:

static ::[std::locale::id](<#/doc/locale/locale/id>) id;

### Funções Membro

[ (construtor)](<#/doc/locale/locale/facet/facet>) | constrói um novo facet com contagem de referência especificada
(função membro protegida)
operator= | o operador de atribuição de cópia é deletado
(função membro protegida)
(destrutor)[virtual] | o destrutor é virtual protegido
(função membro virtual protegida)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2694](<https://cplusplus.github.io/LWG/issue2694>) | C++98 | a definição de 'facet' foi removida pela resolução do [LWG issue 436](<https://cplusplus.github.io/LWG/issue436>) | adicionada a definição de volta

### Veja também

[ id](<#/doc/locale/locale/id>) | o tipo de índice do facet: cada classe facet deve declarar ou herdar um membro estático público deste tipo
(classe)