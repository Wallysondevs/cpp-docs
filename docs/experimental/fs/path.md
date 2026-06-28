# std::experimental::filesystem::path

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
class path;
```

Objetos do tipo `path` representam caminhos em um sistema de arquivos. Apenas aspectos sintáticos dos caminhos são tratados: o nome do caminho pode representar um caminho não existente ou até mesmo um que não é permitido existir no sistema de arquivos ou SO atual.

O nome do caminho possui a seguinte sintaxe:

1.  root-name (opcional): identifica a raiz em um sistema de arquivos com múltiplas raízes (como "C:" ou "//myserver"). Sistemas de arquivos POSIX possuem uma única raiz.
2.  root-directory (opcional): um separador de diretório que, se presente, marca este caminho como _absoluto_. Se estiver ausente (e o primeiro elemento diferente do nome da raiz for um nome de arquivo), então o caminho é _relativo_ e requer outro caminho como localização inicial para ser resolvido para um nome de arquivo.
3.  Zero ou mais dos seguintes:

    *   file-name: sequência de caracteres que não são separadores de diretório ou separadores de diretório preferenciais (limitações adicionais podem ser impostas pelo SO ou sistema de arquivos). Este nome pode identificar um arquivo, um hard link, um symbolic link ou um diretório. Dois nomes de arquivo especiais são reconhecidos:

        *   dot: o nome de arquivo que consiste em um único caractere ponto . é um nome de diretório que se refere ao diretório atual.
        *   dot-dot: o nome de arquivo que consiste em dois caracteres ponto .. é um nome de diretório que se refere ao diretório pai.

    *   directory-separators: o caractere barra / ou o caractere alternativo fornecido como `path::preferred_separator`. Se este caractere for repetido, ele é tratado como um único separador de diretório: /usr///////lib é o mesmo que /usr/lib.

O caminho pode ser percorrido elemento por elemento através de iterators retornados pelas funções [begin()](<#/doc/experimental/fs/path/begin>) e [end()](<#/doc/experimental/fs/path/begin>), que iteram sobre o nome da raiz, diretório raiz e os elementos subsequentes de nome de arquivo (separadores de diretório são ignorados, exceto aquele que identifica o diretório raiz). Se o último elemento no caminho for um separador de diretório, o último iterator fará a desreferência para um nome de arquivo dot.

Chamar qualquer função membro não-const de um `path` invalida todos os iterators que se referem a elementos desse objeto.

Se o SO usa uma sintaxe _nativa_ que é diferente da sintaxe _genérica_ portátil descrita acima, todas as funções da biblioteca aceitam nomes de caminho em ambos os formatos.

Caminhos são implicitamente conversíveis para e de [std::basic_string](<#/doc/string/basic_string>)s, o que torna possível usá-los com outras APIs de arquivo, por exemplo, como um argumento para [std::ifstream::open](<#/doc/io/basic_ifstream/open>).

### Tipos Membro

Tipo | Definição
---|---
`value_type` | tipo de caractere usado pela codificação nativa do sistema de arquivos: char em POSIX, wchar_t em Windows
`string_type` | [std::basic_string](<#/doc/string/basic_string>)<value_type>
`const_iterator` | um [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) constante com um `value_type` de `path`
`iterator` | um alias para `const_iterator`

### Constantes Membro

constexpr value_type preferred_separator[static] | separador de diretório alternativo que pode ser usado além da barra portátil /. No Windows, este é o caractere barra invertida \. Em POSIX, este é o mesmo caractere barra / que o separador portátil
(constante membro estática pública)

### Funções Membro

[ (constructor)](<#/doc/experimental/fs/path/path>) | constrói um `path`
(public member function)
[ (destructor)](<#/doc/experimental/fs/path/~path>) | destrói um objeto `path`
(public member function)
[ operator=](<#/>) | atribui outro path
(public member function)
[ assign](<#/doc/experimental/fs/path/assign>) | atribui conteúdo
(public member function)

##### Concatenação

[ appendoperator/=](<#/doc/experimental/fs/path/append>) | anexa elementos ao path
(public member function)
[ concatoperator+=](<#/doc/experimental/fs/path/concat>) | concatena dois paths sem introduzir um separador de diretório
(public member function)

##### Modificadores

[ clear](<#/doc/experimental/fs/path/clear>) | apaga o conteúdo
(public member function)
[ make_preferred](<#/doc/experimental/fs/path/make_preferred>) | converte separadores de diretório para o separador de diretório preferencial
(public member function)
[ remove_filename](<#/doc/experimental/fs/path/remove_filename>) | remove o componente de nome de arquivo do path
(public member function)
[ replace_filename](<#/doc/experimental/fs/path/replace_filename>) | substitui o último componente do path por outro path
(public member function)
[ replace_extension](<#/doc/experimental/fs/path/replace_extension>) | substitui a extensão
(public member function)
[ swap](<#/doc/experimental/fs/path/swap>) | troca dois paths
(public member function)

##### Observadores de Formato

[ c_strnativeoperator string_type](<#/doc/experimental/fs/path/native>) | retorna a versão nativa do path
(public member function)
[ stringwstringu8stringu16stringu32string](<#/doc/experimental/fs/path/string>) | retorna o path no formato de nome de caminho nativo convertido para uma string
(public member function)
[ generic_stringgeneric_wstringgeneric_u8stringgeneric_u16stringgeneric_u32string](<#/doc/experimental/fs/path/generic_string>) | retorna o path no formato de nome de caminho genérico convertido para uma string
(public member function)

##### Comparar

[ compare](<#/doc/experimental/fs/path/compare>) | compara as representações lexicais de dois paths lexicograficamente
(public member function)

##### Decomposição

[ root_name](<#/doc/experimental/fs/path/root_name>) | retorna o root-name do path, se presente
(public member function)
[ root_directory](<#/doc/experimental/fs/path/root_directory>) | retorna o diretório raiz do path, se presente
(public member function)
[ root_path](<#/doc/experimental/fs/path/root_path>) | retorna o root path do path, se presente
(public member function)
[ relative_path](<#/doc/experimental/fs/path/relative_path>) | retorna o path relativo ao root path
(public member function)
[ parent_path](<#/doc/experimental/fs/path/parent_path>) | retorna o path do diretório pai
(public member function)
[ filename](<#/doc/experimental/fs/path/filename>) | retorna o componente de nome de arquivo do path
(public member function)
[ stem](<#/doc/experimental/fs/path/stem>) | retorna o componente stem do path
(public member function)
[ extension](<#/doc/experimental/fs/path/extension>) | retorna o componente de extensão de arquivo do path
(public member function)

##### Consultas

[ empty](<#/doc/experimental/fs/path/empty>) | verifica se o path está vazio
(public member function)
[ has_root_pathhas_root_namehas_root_directoryhas_relative_pathhas_parent_pathhas_filenamehas_stemhas_extension](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento do path correspondente não está vazio
(public member function)
[ is_absoluteis_relative](<#/doc/experimental/fs/path/is_absrel>) | verifica se [root_path()](<#/doc/experimental/fs/path/root_path>) identifica unicamente a localização no sistema de arquivos
(public member function)

##### Iterators

[ beginend](<#/doc/experimental/fs/path/begin>) | acesso por iterator ao path como uma sequência de elementos
(public member function)

### Funções Não-Membro

[ swap(std::experimental::filesystem::path)](<#/doc/experimental/fs/path/swap2>) | troca dois paths
(function)
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/fs/path/operator_cmp>) | compara dois paths lexicograficamente
(function)
[ operator/](<#/doc/experimental/fs/path/operator_slash>) | concatena dois paths com um separador de diretório
(function)
[ operator<&lt;operator&gt;>](<#/doc/experimental/fs/path/operator_ltltgtgt>) | realiza entrada e saída de stream em um path
(function)
[ u8path](<#/doc/experimental/fs/path/u8path>) | cria um `path` a partir de uma fonte codificada em UTF-8
(function)